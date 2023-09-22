import WordPressMadara from './templates/WordPressMadara.mjs';
import Manga from '../engine/Manga.mjs';

// WordPressMadara clone without running WordPress ...
export default class Manga18FX extends WordPressMadara {

    constructor() {
        super();
        super.id = 'manga18fx';
        super.label = 'Manga18fx';
        this.tags = [ 'manga', 'webtoon', 'hentai', 'english', 'korean' ];
        this.url = 'https://manga18fx.com';
    }

    async _getMangaFromURI(uri) {
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.post-title > h1');
        const id = uri.pathname;
        const title = data[0].textContent.trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        const lastID = list => list.length ? list[list.length - 1].id : null;
        let mangaList = [];
        for (let page = 1, run = true; run; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangas.length > 0 && lastID(mangas) !== lastID(mangaList) ? mangaList.push(...mangas) : run = false;
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        const request = new Request(new URL('/page/' + page, this.url), this.requestOptions);
        const data = await this.fetchDOM(request, 'div.bixbox div.listupd div.bigor-manga h3 a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.text.trim()
            };
        });
    }

    async _getChapters(manga) {
        const request = new Request(new URL(manga.id, this.url), this.requestOptions);
        const data = await this.fetchDOM(request, 'div#chapterlist ul li');
        return data.map(element => {
            let chapter = element.querySelector('a.chapter-name');
            let date = element.querySelector('.chapter-time');
            console.log(date ? Date.parse(date.textContent) : new Date().getTime());
            return {
                id: this.getRootRelativeOrAbsoluteLink(chapter, this.url),
                title: chapter.textContent.trim(),
                date: date ? Date.parse(date.textContent) : new Date().getTime(),
            };
        });
    }

    async _getPages(chapter) {
        const request = new Request(new URL(chapter.id, this.url), this.requestOptions);
        const data = await this.fetchDOM(request, 'div.read-manga div.read-content > source, div.read-manga div.read-content div.page-break source');
        return data.map(image => this.createConnectorURI({
            url: this.getAbsolutePath(image, request.url),
            referer: request.url
        }));
    }

    async _getMangaDetails(manga) {
        let queryDetails = {
            thumbnail: '.img-loading',
            title: '.post-title > h1',
            author: '.post-content_item',
            artist: '$',
            description: '.dsct',
            genre: '$',
            status: '$',
        };

        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, '.manga-content');

        if (data.length == 1) {
            data = data[0];

            // Thumbnail
            this.details.thumbnail = data.querySelector(queryDetails.thumbnail).getAttribute('data-src');

            // Title
            this.details.title = data.querySelector(queryDetails.title).textContent.trim();

            // Description
            this.details.description = data.querySelector(queryDetails.description).textContent.trim();

            // Author Artis Genre Status
            data.querySelectorAll(queryDetails.author).forEach(element => {
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

        return this.details;
    }
}