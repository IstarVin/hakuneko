import Connector from '../../engine/Connector.mjs';
import Manga from '../../engine/Manga.mjs';

export default class WordPressMadara extends Connector {

    constructor() {
        super();
        super.id = undefined;
        super.label = undefined;
        this.url = undefined;
        this.path = '';

        this.queryMangas = 'div.post-title h3 a, div.post-title h5 a';
        this.queryChapters = 'li.wp-manga-chapter';
        this.queryChaptersTitleBloat = undefined;
        this.queryPages = 'div.page-break source';
        this.queryTitleForURI = 'head meta[property="og:title"]';
        this.queryPlaceholder = '[id^="manga-chapters-holder"][data-id]';

        this.queryDetails = {
            thumbnail: '.summary_image > a > img, .summary_image > a > source',
            title: '.post-title > h1',
            author: '.post-content_item',
            artist: '$',
            description: '.dsct',
            genre: '$',
            status: '$',
        };
    }

    _createMangaRequest(page) {
        let form = new URLSearchParams();
        form.append('action', 'madara_load_more');
        form.append('template', 'madara-core/content/content-archive');
        form.append('page', page);
        form.append('vars[paged]', '0');
        form.append('vars[post_type]', 'wp-manga');
        form.append('vars[posts_per_page]', '250');
        // inject `madara.query_vars` into any website using wp-madara to see full list of supported vars

        this.requestOptions.method = 'POST';
        this.requestOptions.body = form.toString();
        let request = new Request(new URL(this.path + '/wp-admin/admin-ajax.php', this.url), this.requestOptions);
        request.headers.set('content-type', 'application/x-www-form-urlencoded');
        request.headers.set('x-referer', this.url);
        this.requestOptions.method = 'GET';
        delete this.requestOptions.body;
        return request;
    }

    async _getMangas() {
        let mangaList = [];
        for (let page = 0, run = true; run; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangas.length > 0 ? mangaList.push(...mangas) : run = false;
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        let request = this._createMangaRequest(page);
        let data = await this.fetchDOM(request, this.queryMangas);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, request.url),
                title: element.text.trim()
            };
        });
    }

    async _getChaptersAjaxOld(dataID) {
        let uri = new URL(this.path + '/wp-admin/admin-ajax.php', this.url);
        let request = new Request(uri, {
            method: 'POST',
            body: 'action=manga_get_chapters&manga=' + dataID,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-referer': this.url
            }
        });
        const data = await this.fetchDOM(request, this.queryChapters);
        if (data.length) {
            return data;
        } else {
            throw new Error('No chapters found (old ajax endpoint)!');
        }
    }

    async _getChaptersAjax(mangaID) {
        const uri = new URL(mangaID + 'ajax/chapters/', this.url);
        const request = new Request(uri, { method: 'POST' });
        const data = await this.fetchDOM(request, this.queryChapters);
        if (data.length) {
            return data;
        } else {
            throw new Error('No chapters found (new ajax endpoint)!');
        }
    }

    async _getChapters(manga) {
        let uri = new URL(manga.id, this.url);
        let request = new Request(uri, this.requestOptions);
        let dom = (await this.fetchDOM(request, 'body'))[0];
        let data = [...dom.querySelectorAll(this.queryChapters)];
        let placeholder = dom.querySelector(this.queryPlaceholder);
        if (placeholder) {
            const promises = await Promise.allSettled([
                this._getChaptersAjax(manga.id),
                this._getChaptersAjaxOld(placeholder.dataset.id)
            ]);
            data = promises.find(promise => /fulfilled/i.test(promise.status)).value;
        }

        return data.map(element => {
            if (this.queryChaptersTitleBloat) {
                [...element.querySelectorAll(this.queryChaptersTitleBloat)].forEach(bloat => {
                    if (bloat.parentElement) {
                        bloat.parentElement.removeChild(bloat);
                    }
                });
            }
            let chapter = element.querySelector('a');
            let date = element.querySelector('.chapter-release-date');
            return {
                id: this.getRootRelativeOrAbsoluteLink(chapter, request.url),
                title: chapter.text.replace(manga.title, '').trim(),
                date: date.textContent ? Date.parse(date.textContent) : Date.now(),
                language: ''
            };
        });
    }

    async _getPages(chapter) {
        let uri = new URL(chapter.id, this.url);
        uri.searchParams.set('style', 'list');
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, this.queryPages);
        // HACK: Some Madara websites have added the '?style=list' pattern as CloudFlare WAF rule
        //       => Try without style parameter to bypass CloudFlare matching rule
        if (!data || !data.length) {
            uri.searchParams.delete('style');
            request = new Request(uri, this.requestOptions);
            data = await this.fetchDOM(request, this.queryPages);
        }
        return data.map(element => {
            element.src = element.dataset['url'] || element.dataset['src'] || element['srcset'] || element.src;
            element.setAttribute('src', element.src);
            if (element.src.includes('data:image')) {
                return element.src.match(/data:image[^\s'"]*/)[0];
            } else {
                const uri = new URL(this.getAbsolutePath(element, request.url));
                // HACK: bypass proxy for https://website.net/wp-content/webpc-passthru.php?src=https://website.net/wp-content/uploads/WP-manga/data/manga/chapter/001.jpg&nocache=1?ssl=1
                const canonical = uri.searchParams.get('src');
                if (canonical && /^https?:/.test(canonical)) {
                    uri.href = canonical;
                }
                return this.createConnectorURI({
                    // HACK: bypass 'i0.wp.com' image CDN to ensure original images are loaded directly from host
                    url: uri.href.replace(/\/i\d+\.wp\.com/, ''),
                    referer: request.url
                });
            }
        });
    }

    async _handleConnectorURI(payload) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        let request = new Request(payload.url, this.requestOptions);
        request.headers.set('x-referer', payload.referer);
        let response = await fetch(request);
        let data = await response.blob();
        data = await this._blobToBuffer(data);
        this._applyRealMime(data);
        return data;
    }

    async _getMangaFromURI(uri) {
        const request = new Request(new URL(uri), this.requestOptions);
        const data = await this.fetchDOM(request, this.queryTitleForURI);
        const element = [...data].pop();
        const title = (element.content || element.textContent).trim();
        return new Manga(this, uri, title);
    }

    async _getMangaDetails(manga) {
        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'body');

        console.log(data[0]);

        if (data.length == 1) {
            data = data[0];

            // Thumbnail
            this.details.thumbnail = data.querySelector(this.queryDetails.thumbnail).src.replace(/-\d+x\d+/, '');

            // Title
            this.details.title = data.querySelector(this.queryDetails.title).textContent.trim();

            // Description
            this.details.description = data.querySelector(this.queryDetails.description).textContent.trim();

            // Author Artis Genre Status
            data.querySelectorAll(this.queryDetails.author).forEach(element => {
                let key = element.querySelector('.summary-heading').textContent.trim();
                let value = element.querySelector('.summary-content').textContent.trim();

                if (element.querySelector('.author-content')) {
                    this.details.author = value;
                } else if (element.querySelector('.artist-content')) {
                    this.details.artist = value;
                } else if (element.querySelector('.genres-content')) {
                    element.querySelectorAll('.genres-content > a').forEach(e => {
                        this.details.genre.push(e.textContent.trim());
                    });
                } else if (key === 'Status') {
                    this.details.status = value;
                }
            });
        }

        console.log(this.details);

        return this.details;
    }
}
