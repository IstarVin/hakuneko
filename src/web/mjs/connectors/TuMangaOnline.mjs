import Connector from '../engine/Connector.mjs';

export default class TuMangaOnline extends Connector {

    constructor() {
        super();
        super.id = 'tumangaonline';
        super.label = 'TuMangaOnline';
        this.tags = [ 'manga', 'spanish' ];
        this.url = 'https://tmofans.com';
        this.requestOptions.headers.set('x-referer', this.url);
    }

    async _initializeConnector() {
        await super._initializeConnector();
        await this.wait(2500);
    }

    async _getMangas() {
        let request = new Request('http://cdn.hakuneko.download/' + this.id + '/mangas.json', this.requestOptions);
        let response = await fetch(request);
        return await response.json();
    }

    async _getChapters(manga) {
        let script = `
            var _0x20e3=['wpsFZMKyDWRneSw=','HErDsTdm','wroDQMKybQ==','JS7DvQ==','MMK0SsO/wpzDlw==','MWc6w7I=','wrh8w64=','wovChcK6ZsOBK8OA','WMOZUsOUSg==','w6nCpiDDj8K4','MFUjw5NS','e8KywoHCpS4=','TBcTIsKjw5c=','w6lHFAtJw67CssOswp/CtA==','WWFbwozDrQnCh8KWTQ==','ZcKoa8Ojw4w=','w5dfJW8g','KnU7w7tp','Z8KNfMOhw40=','WmnCmzfDrw==','wqQ0E2I=','w5waL8OSwrs=','wqQPOXExwq7DksK5BHAgw4RFwrMeSg==','wpILJMKcJw==','wrohDmbDmF3CjV/CrCzCtTJKRA==','w7rCmXZjAw==','wqnCpMKsUMK/XA==','e8KXdMONw44=','KCPDuDLDq8KmLhTDmyrCu8KuQVXDh8KYCMKLG8KVw4FNIgXCpgHDpXIaw6tEUsKDbMKxWn/CqcOkwoPDgsKqw7hLBH0=','fn3Cghp1','w6vCgivDqMKmw4/CtU7Dg8Of','wrcCNQUN','clfCoUFAUDvDplfDtHDCtMK7csOWw5Vew5ZpwqnCv8Oiwoorw6Auw7NZw6pMwosgwr1gO8O1CcODw7J2cUIGwoTCp8Ktw4VaDR/CmTLCiBFHPxfCncO3woxaw4pWBsOhLsOF','Z2JfwoXDjw==','BMONw5zDvsOiIsOqwrQx','w7J3Klkg','HgHCrcOBDQ==','Kg8OwpbCocO4wp0jNcO+w61FMk7Do0/DkVMzwoh9w6PDisKCL8OOW37DhB9lKsKcbcKzw69ewpw2wrXDusK8wogfw4fDusK+wovDuSLCthFDLsO2w4jClRsb','w7sOG0sR','RU/CtCJz','wqTDhsK2wpzCrCfDhT7DocKE','w5oNE8OrwoU=','w57ChA3DssKrw6DDrMKa','STkNB8K0','QsKawobCgws=','fcKkwrM=','SyEALy/CpjDCtcKLwpUNw5dT','TcOVwrvDng==','w6gILHwqwqrDs8KmE3ghw4ND','CsKLw6sHw6Y=','w5fCslVPCQ==','wojChRBpwoE=','wqcQF1DDqA==','w6pkDHY8w6E=','NQHClMOGNEg=','JwXDt8KPC8Od','w4U/OHwp','woLCgh7DqMKpw63DocKFAg==','w4t5FA==','w4wiEQE=','wqopBGk=','EEHDpCw=','BBPDuMKD','w78KJw==','w6IUKnErwqvDk8K5','fVPCvRHDjQ==','wrfCvQY=','wow6D8KeFMKO','w64ZP8OH','w5RJw5M=','w4fCgDBW','wr46MGQ=','wqEQYMKFaw==','bX3CiCjDvQ==','JQEKw5nCiw==','wqfCtx7DgMKd','VR8X','w6EfOcOHwoE=','d8KowqnCrXPCuxsb','wpk2HMKfAw==','AHbDn8KwZw==','wrUkOnHDnFrCmA==','wq8PK3/Cpg==','MMKDw75X','SVPDucK/','wqVqw7TCog==','JAnDm2nDng==','w75HMQhP','wq86EQ==','w4lIw5jDrQ==','X0PCsAg=','ahwNIMKR','w5zCkwd8w48=','LxrDlMKVKg==','wrspJQ=='];(function(_0x27c86f,_0x4122fc){var _0x53864b=function(_0x5aac6b){while(--_0x5aac6b){_0x27c86f['push'](_0x27c86f['shift']());}};_0x53864b(++_0x4122fc);}(_0x20e3,0x6f));var _0x5e6b=function(_0x3966c6,_0x3a3c96){_0x3966c6=_0x3966c6-0x0;var _0x153584=_0x20e3[_0x3966c6];if(_0x5e6b['DAWnRV']===undefined){(function(){var _0x335393=function(){var _0x33b8af;try{_0x33b8af=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5bf434){_0x33b8af=window;}return _0x33b8af;};var _0x1a8073=_0x335393();var _0x15cd0e='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1a8073['atob']||(_0x1a8073['atob']=function(_0x2dec64){var _0x58ef13=String(_0x2dec64)['replace'](/=+$/,'');for(var _0x3f4306=0x0,_0x3ec28f,_0x297854,_0x4245ce=0x0,_0x2bfe8a='';_0x297854=_0x58ef13['charAt'](_0x4245ce++);~_0x297854&&(_0x3ec28f=_0x3f4306%0x4?_0x3ec28f*0x40+_0x297854:_0x297854,_0x3f4306++%0x4)?_0x2bfe8a+=String['fromCharCode'](0xff&_0x3ec28f>>(-0x2*_0x3f4306&0x6)):0x0){_0x297854=_0x15cd0e['indexOf'](_0x297854);}return _0x2bfe8a;});}());var _0x4f6ed5=function(_0x4b9a0c,_0x3a3c96){var _0x41fb64=[],_0xd340e5=0x0,_0x224847,_0x16e7ed='',_0x25638a='';_0x4b9a0c=atob(_0x4b9a0c);for(var _0x350105=0x0,_0x4075f6=_0x4b9a0c['length'];_0x350105<_0x4075f6;_0x350105++){_0x25638a+='%'+('00'+_0x4b9a0c['charCodeAt'](_0x350105)['toString'](0x10))['slice'](-0x2);}_0x4b9a0c=decodeURIComponent(_0x25638a);for(var _0x1f2fc5=0x0;_0x1f2fc5<0x100;_0x1f2fc5++){_0x41fb64[_0x1f2fc5]=_0x1f2fc5;}for(_0x1f2fc5=0x0;_0x1f2fc5<0x100;_0x1f2fc5++){_0xd340e5=(_0xd340e5+_0x41fb64[_0x1f2fc5]+_0x3a3c96['charCodeAt'](_0x1f2fc5%_0x3a3c96['length']))%0x100;_0x224847=_0x41fb64[_0x1f2fc5];_0x41fb64[_0x1f2fc5]=_0x41fb64[_0xd340e5];_0x41fb64[_0xd340e5]=_0x224847;}_0x1f2fc5=0x0;_0xd340e5=0x0;for(var _0x95c10d=0x0;_0x95c10d<_0x4b9a0c['length'];_0x95c10d++){_0x1f2fc5=(_0x1f2fc5+0x1)%0x100;_0xd340e5=(_0xd340e5+_0x41fb64[_0x1f2fc5])%0x100;_0x224847=_0x41fb64[_0x1f2fc5];_0x41fb64[_0x1f2fc5]=_0x41fb64[_0xd340e5];_0x41fb64[_0xd340e5]=_0x224847;_0x16e7ed+=String['fromCharCode'](_0x4b9a0c['charCodeAt'](_0x95c10d)^_0x41fb64[(_0x41fb64[_0x1f2fc5]+_0x41fb64[_0xd340e5])%0x100]);}return _0x16e7ed;};_0x5e6b['PxorgF']=_0x4f6ed5;_0x5e6b['QleBVC']={};_0x5e6b['DAWnRV']=!![];}var _0x1eabe8=_0x5e6b['QleBVC'][_0x3966c6];if(_0x1eabe8===undefined){if(_0x5e6b['hHOGHN']===undefined){_0x5e6b['hHOGHN']=!![];}_0x153584=_0x5e6b['PxorgF'](_0x153584,_0x3a3c96);_0x5e6b['QleBVC'][_0x3966c6]=_0x153584;}else{_0x153584=_0x1eabe8;}return _0x153584;};new Promise(_0x21acf7=>{var _0x166f8b={};_0x166f8b[_0x5e6b('0x0','7Ij!')]=function(_0x1b9884,_0x10afa7){return _0x1b9884(_0x10afa7);};_0x166f8b[_0x5e6b('0x1','hPu6')]=function(_0x31349b,_0x3d8423){return _0x31349b(_0x3d8423);};_0x166f8b[_0x5e6b('0x2','iRQ*')]=function(_0xcd9a0b,_0x5ef1a5){return _0xcd9a0b===_0x5ef1a5;};_0x166f8b[_0x5e6b('0x3',')O#&')]=_0x5e6b('0x4','0##!');_0x166f8b[_0x5e6b('0x5','kB4b')]=_0x5e6b('0x6','#B3x');_0x166f8b[_0x5e6b('0x7','ABTB')]=_0x5e6b('0x8','u0E9');_0x166f8b[_0x5e6b('0x9','P!tZ')]=_0x5e6b('0xa','R3JR');_0x166f8b[_0x5e6b('0xb','iRQ*')]=_0x5e6b('0xc','@E7G');_0x166f8b[_0x5e6b('0xd','@7EM')]=_0x5e6b('0xe',')n!M');_0x166f8b[_0x5e6b('0xf','M4Ah')]=_0x5e6b('0x10','@7EM');_0x166f8b[_0x5e6b('0x11','v&Gm')]=_0x5e6b('0x12','5q*n');_0x166f8b[_0x5e6b('0x13','7Ij!')]=function(_0x49aa1e,_0x52a05b){return _0x49aa1e(_0x52a05b);};_0x166f8b[_0x5e6b('0x14','$FrX')]=_0x5e6b('0x15','!oHH');_0x166f8b[_0x5e6b('0x16','#B3x')]=function(_0x14a522,_0x15f6f0){return _0x14a522<_0x15f6f0;};_0x166f8b[_0x5e6b('0x17','@7EM')]=_0x5e6b('0x18',']twM');_0x166f8b[_0x5e6b('0x19','kB4b')]=_0x5e6b('0x1a','$1$a');_0x166f8b[_0x5e6b('0x1b','w&^I')]=function(_0x2ae473,_0x83b714){return _0x2ae473+_0x83b714;};_0x166f8b[_0x5e6b('0x1c',']X@!')]=function(_0x4f50fc,_0x283d10,_0x5a8631){return _0x4f50fc(_0x283d10,_0x5a8631);};let _0x583e28={};_0x583e28[_0x5e6b('0x1d','35a*')]=[];let _0x557ca7=document[_0x5e6b('0x1e','cJB)')][_0x5e6b('0x1f','hBdv')](document);document[_0x5e6b('0x20','#B3x')]=_0x4b7b6f=>{var _0x6d3072={};_0x6d3072[_0x5e6b('0x21','oq#r')]=function(_0x1f3670,_0x4ed034){return _0x166f8b.NNKtu(_0x1f3670,_0x4ed034);};let _0x65cbc4=_0x166f8b[_0x5e6b('0x22','P!tZ')](_0x557ca7,_0x4b7b6f);if(_0x166f8b[_0x5e6b('0x23','5l8H')](_0x4b7b6f,_0x166f8b[_0x5e6b('0x24','u0E9')])){_0x65cbc4[_0x5e6b('0x25','7Ij!')]=()=>{let _0x3f7c9f=new URL(_0x65cbc4[_0x5e6b('0x26','$FrX')]);_0x3f7c9f[_0x5e6b('0x27','#$9R')]=_0x6d3072[_0x5e6b('0x28','#B3x')]($,_0x65cbc4)[_0x5e6b('0x29','$1$a')]();_0x583e28[_0x5e6b('0x2a','Sy&@')][_0x5e6b('0x2b','*Pkc')](_0x3f7c9f[_0x5e6b('0x2c','0##!')]);};}return _0x65cbc4;};let _0x3e460f=$[_0x5e6b('0x2d','uJ(G')];$[_0x5e6b('0x2e','(MF*')]=_0x43e50e=>{if(_0x43e50e[_0x5e6b('0x2f','kB4b')][_0x5e6b('0x30','#B3x')](_0x166f8b[_0x5e6b('0x31',')O#&')])){let _0x24fb60=new URL(_0x43e50e[_0x5e6b('0x32','5l8H')]);_0x24fb60[_0x5e6b('0x33','ABTB')]=new URLSearchParams(_0x43e50e[_0x5e6b('0x34','kB4b')]);_0x583e28[_0x5e6b('0x35','ITsP')][_0x5e6b('0x36','wut@')](_0x24fb60[_0x5e6b('0x37','u0E9')]);}else{return _0x166f8b[_0x5e6b('0x38','*P89')](_0x3e460f,_0x43e50e);}};_0x583e28[_0x166f8b[_0x5e6b('0x39',')O#&')]]=[..._0x166f8b[_0x5e6b('0x3a','!oHH')]($,_0x166f8b[_0x5e6b('0x3b','$1$a')])][_0x5e6b('0x3c','w&^I')](_0x33eb15=>{_0x33eb15=_0x166f8b[_0x5e6b('0x3d','kB4b')]($,_0x33eb15)[_0x5e6b('0x3e','35a*')]()[_0x5e6b('0x3f','ABTB')]();_0x33eb15[_0x5e6b('0x40','t)Mg')]();return _0x33eb15[_0x5e6b('0x41','u0E9')](_0x166f8b[_0x5e6b('0x42','0##!')])[_0x5e6b('0x43','[kk*')]('h4')[_0x5e6b('0x44','Qiv5')]()[_0x5e6b('0x45','OmS!')]();});_0x583e28[_0x166f8b[_0x5e6b('0x46','@E7G')]]=[..._0x166f8b[_0x5e6b('0x22','P!tZ')]($,_0x166f8b[_0x5e6b('0x47','^4co')])][_0x5e6b('0x48','0##!')](_0x48cdfa=>_0x48cdfa[_0x5e6b('0x49','ITsP')][_0x5e6b('0x4a',')O#&')]());_0x583e28[_0x166f8b[_0x5e6b('0x4b','w&^I')]]=[..._0x166f8b[_0x5e6b('0x4c','wut@')]($,_0x166f8b[_0x5e6b('0x4d','(MF*')])][_0x5e6b('0x4e','u0E9')](_0x1c6b2e=>_0x1c6b2e[_0x5e6b('0x4f','tc@7')][_0x5e6b('0x50','uJ(G')](/flag-icon-([a-z]+)/)[0x1]);let _0x5c75a8=[];for(let _0x39e039=0x0;_0x166f8b[_0x5e6b('0x51','*P89')](_0x39e039,_0x583e28[_0x5e6b('0x52','@E7G')][_0x5e6b('0x53','MF0H')]);_0x39e039++){_0x5c75a8[_0x5e6b('0x54','hPu6')]({'id':_0x583e28[_0x5e6b('0x55','OmS!')][_0x39e039][_0x5e6b('0x56','Dnkb')](_0x166f8b[_0x5e6b('0x57','m5lc')],_0x166f8b[_0x5e6b('0x19','kB4b')]),'title':_0x166f8b[_0x5e6b('0x58',')n!M')](_0x166f8b[_0x5e6b('0x59','hPu6')](_0x166f8b[_0x5e6b('0x5a',']X@!')](_0x583e28[_0x5e6b('0x5b','w&^I')][_0x39e039],'\x20['),_0x583e28[_0x5e6b('0x5c','^4co')][_0x39e039]),']'),'language':_0x583e28[_0x5e6b('0x5d','v&Gm')][_0x39e039]});}_0x166f8b[_0x5e6b('0x5e','iRQ*')](setTimeout,()=>_0x21acf7(_0x5c75a8),0x9c4);});
        `;
        let request = new Request(this.url + manga.id, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        data.forEach(chapter => chapter.id = this.getRootRelativeOrAbsoluteLink(chapter.id, request.url));
        return data;
    }

    async _getPages(chapter) {
        let script = `
            window['uri'] = new URL('${chapter.id}', '${this.url}');
            var _0x5d22=['w4TDp8K6','wrbDnURFw4IhKho=','wrUJFVtA','w7Zlwp5Iw5o=','w6/CsMKJwofCuQ==','w4o0PVXDjg==','woEHGD0sw7psG8Okw4MBMMKAw4FtwpLDm8KtV3x9w57DsSh/wrjCmcKmwp8cEsKSDMOOw5h+w4IaSWopw6BZJcO6w7XDt2TCv8KUw6vCuMOVaMKIPsKGwpHCqMO4OMKqFcKO','woIFLXYc','wrDDvhEKEg==','VsO4wqHDr2bDmDQFwpw=','wpUhwolhw58=','w5nDp8K2FgzDjmk=','Qytdw4jDqw==','w4xWw44=','asOHw6DDgsOj','w5rDo8Krw7HDmcO4','wrsOwoVrw4Q=','wo4LwoFqw5o=','w5jDizZ/ZQ==','aMKMBQ==','fMK3F8KNwoU=','wpLDgWRxw7E=','w6XDisK/Pz/CtsK3wpnDisOww6jChGvDgQMCw4Y+wrJqbcKbHlIZVEtdw6h4wrRXLAgfw4oLDsKJTVhyw4Vuwqdq','KcKKFkM=','N8Ocw7gT','SWHDq8OIw7g=','w4XDlsOZHsK3','wrrDvDADKg==','W8KQOcK4wok=','Z3FxXws=','ZCo6w6TCkWM=','woEPGn8=','w6Q+Mn3DlmNbwps=','w75Pw5PDosO4','w5kjwqTDq34=','w48AwovDi1s=','wpM1OcKzQw==','w6MHEzvCvcO3w6A=','w7bDtsOIDcKN','wo9aVcOaw5o=','dsO0wojDlUM=','w5UzRkrCgMKSwp0=','w5MBPCzCnQ==','w6fDty1VXw==','OMKBIHA3','GMK7B1Y4','wqd1VsOc','WFE9w5hI','V8Oww5c=','wpnDox0=','X8KhO8Ktwqs=','TU/Dt2/CrQ==','DsKZwonDkz4=','TGnDp0HClg==','Wh59w6VY','wo0CKsOZwqM='];(function(_0x22cae5,_0x81dc3b){var _0x3372c7=function(_0x2d017b){while(--_0x2d017b){_0x22cae5['push'](_0x22cae5['shift']());}};_0x3372c7(++_0x81dc3b);}(_0x5d22,0xe4));var _0x2a17=function(_0x123678,_0x3b972c){_0x123678=_0x123678-0x0;var _0x364533=_0x5d22[_0x123678];if(_0x2a17['ANDKJx']===undefined){(function(){var _0x379ac8=function(){var _0x47757a;try{_0x47757a=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x16e9ad){_0x47757a=window;}return _0x47757a;};var _0x135fa1=_0x379ac8();var _0xa481f4='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x135fa1['atob']||(_0x135fa1['atob']=function(_0x21e2e5){var _0xf0d36b=String(_0x21e2e5)['replace'](/=+$/,'');for(var _0x347063=0x0,_0x3f9970,_0x3a5fd9,_0x517fb7=0x0,_0x39be17='';_0x3a5fd9=_0xf0d36b['charAt'](_0x517fb7++);~_0x3a5fd9&&(_0x3f9970=_0x347063%0x4?_0x3f9970*0x40+_0x3a5fd9:_0x3a5fd9,_0x347063++%0x4)?_0x39be17+=String['fromCharCode'](0xff&_0x3f9970>>(-0x2*_0x347063&0x6)):0x0){_0x3a5fd9=_0xa481f4['indexOf'](_0x3a5fd9);}return _0x39be17;});}());var _0x22f009=function(_0x59767d,_0x3b972c){var _0x554343=[],_0x15e95b=0x0,_0x20b7be,_0x912153='',_0x45663d='';_0x59767d=atob(_0x59767d);for(var _0x4e24a4=0x0,_0x474913=_0x59767d['length'];_0x4e24a4<_0x474913;_0x4e24a4++){_0x45663d+='%'+('00'+_0x59767d['charCodeAt'](_0x4e24a4)['toString'](0x10))['slice'](-0x2);}_0x59767d=decodeURIComponent(_0x45663d);for(var _0x3e05a8=0x0;_0x3e05a8<0x100;_0x3e05a8++){_0x554343[_0x3e05a8]=_0x3e05a8;}for(_0x3e05a8=0x0;_0x3e05a8<0x100;_0x3e05a8++){_0x15e95b=(_0x15e95b+_0x554343[_0x3e05a8]+_0x3b972c['charCodeAt'](_0x3e05a8%_0x3b972c['length']))%0x100;_0x20b7be=_0x554343[_0x3e05a8];_0x554343[_0x3e05a8]=_0x554343[_0x15e95b];_0x554343[_0x15e95b]=_0x20b7be;}_0x3e05a8=0x0;_0x15e95b=0x0;for(var _0x19dc32=0x0;_0x19dc32<_0x59767d['length'];_0x19dc32++){_0x3e05a8=(_0x3e05a8+0x1)%0x100;_0x15e95b=(_0x15e95b+_0x554343[_0x3e05a8])%0x100;_0x20b7be=_0x554343[_0x3e05a8];_0x554343[_0x3e05a8]=_0x554343[_0x15e95b];_0x554343[_0x15e95b]=_0x20b7be;_0x912153+=String['fromCharCode'](_0x59767d['charCodeAt'](_0x19dc32)^_0x554343[(_0x554343[_0x3e05a8]+_0x554343[_0x15e95b])%0x100]);}return _0x912153;};_0x2a17['agGZcG']=_0x22f009;_0x2a17['VDgNDp']={};_0x2a17['ANDKJx']=!![];}var _0x121e18=_0x2a17['VDgNDp'][_0x123678];if(_0x121e18===undefined){if(_0x2a17['gMFgAl']===undefined){_0x2a17['gMFgAl']=!![];}_0x364533=_0x2a17['agGZcG'](_0x364533,_0x3b972c);_0x2a17['VDgNDp'][_0x123678]=_0x364533;}else{_0x364533=_0x121e18;}return _0x364533;};new Promise((_0x376b31,_0x15c8c7)=>{var _0x1871ef={};_0x1871ef[_0x2a17('0x0','LKA@')]=function(_0x554c4a,_0x1f3f39){return _0x554c4a(_0x1f3f39);};_0x1871ef[_0x2a17('0x1','Z4Xz')]=_0x2a17('0x2','FnCa');_0x1871ef[_0x2a17('0x3','FnCa')]=function(_0x52ff4d,_0x82bb45){return _0x52ff4d(_0x82bb45);};_0x1871ef[_0x2a17('0x4','5Ant')]=_0x2a17('0x5','A%@c');_0x1871ef[_0x2a17('0x6','xEJ6')]=_0x2a17('0x7','beQU');_0x1871ef[_0x2a17('0x8','mhHc')]=_0x2a17('0x9','qnPo');_0x1871ef[_0x2a17('0xa','M^G]')]=_0x2a17('0xb','AoSi');_0x1871ef[_0x2a17('0xc','xEJ6')]=_0x2a17('0xd','xEJ6');_0x1871ef[_0x2a17('0xe','J3iB')]=_0x2a17('0xf','(VdO');_0x1871ef[_0x2a17('0x10','(VdO')]=function(_0x43870f,_0x7ada77){return _0x43870f(_0x7ada77);};_0x1871ef[_0x2a17('0x11','7Ak1')]=_0x2a17('0x12','U)E9');let _0x232ab3=$[_0x2a17('0x13','Hj2M')];$[_0x2a17('0x14','(E1y')]=_0x51b50e=>{var _0x98d9a5={};_0x98d9a5[_0x2a17('0x15','rPca')]=function(_0xe0bfa9,_0x1111bf){return _0x1871ef.QDaqm(_0xe0bfa9,_0x1111bf);};_0x98d9a5[_0x2a17('0x16','dVZq')]=_0x1871ef.GdlDm;_0x98d9a5[_0x2a17('0x17','5Ant')]=function(_0x10adc4,_0x5b0eee){return _0x1871ef.gkChF(_0x10adc4,_0x5b0eee);};_0x98d9a5[_0x2a17('0x18','(VdO')]=_0x1871ef.ZooZs;_0x98d9a5[_0x2a17('0x19','mYI#')]=_0x1871ef.hZdbq;if(Object[_0x2a17('0x1a','wbW%')](_0x51b50e[_0x2a17('0x1b','FnCa')])[_0x2a17('0x1c','Z4Xz')](window[_0x1871ef[_0x2a17('0x1d','qnPo')]][_0x1871ef[_0x2a17('0x1e','s!1F')]][_0x1871ef[_0x2a17('0x1f','s!1F')]]('=')[_0x1871ef[_0x2a17('0x20',')%&O')]]())){_0x51b50e[_0x2a17('0x21','I2dN')]=_0x32e439=>{var _0x4c5ec3={};_0x4c5ec3[_0x2a17('0x22','dVZq')]=function(_0x52d8cd,_0x5ca63e){return _0x98d9a5.GBNag(_0x52d8cd,_0x5ca63e);};_0x4c5ec3[_0x2a17('0x23','f050')]=_0x98d9a5.CAFXM;_0x98d9a5[_0x2a17('0x24','A%@c')](_0x232ab3,{'url':_0x32e439[_0x2a17('0x25','O[st')](_0x98d9a5[_0x2a17('0x26','I2dN')],_0x98d9a5[_0x2a17('0x27','J3iB')]),'success':_0x133c61=>{_0x4c5ec3[_0x2a17('0x28','Hj2M')](_0x376b31,[..._0x4c5ec3[_0x2a17('0x29','UdFi')]($,_0x133c61)[_0x2a17('0x2a','f050')](_0x4c5ec3[_0x2a17('0x2b','&#lW')])][_0x2a17('0x2c','M^G]')](_0x32b661=>_0x32b661[_0x2a17('0x2d','5Ant')]));},'error':(_0x20fea8,_0x2cc48c,_0x2cd2e0)=>{_0x98d9a5[_0x2a17('0x2e','(VdO')](_0x15c8c7,_0x2cd2e0);}});};_0x51b50e[_0x2a17('0x2f','HiW1')]=(_0x5a76ab,_0x5c889d,_0x30a214)=>{_0x1871ef[_0x2a17('0x30','SdGo')](_0x15c8c7,_0x30a214);};_0x1871ef[_0x2a17('0x31','HiW1')](_0x232ab3,_0x51b50e);}};[..._0x1871ef[_0x2a17('0x32','rBfp')]($,_0x1871ef[_0x2a17('0x33','z$]R')])][_0x2a17('0x34','AoSi')](_0x5df80d=>{_0x5df80d=_0x1871ef[_0x2a17('0x31','HiW1')]($,_0x5df80d)[_0x2a17('0x35','7Ak1')]()[_0x2a17('0x36','iBF[')]();_0x5df80d[_0x2a17('0x37','7OUL')]();});});
        `;
        let request = new Request(this.url/* + chapter.manga.id*/, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        return data.map(img => this.createConnectorURI({
            url: this.getAbsolutePath(img, request.url),
            referer: request.url
        }));
    }

    _handleConnectorURI( payload ) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        this.requestOptions.headers.set( 'x-referer', payload.referer );
        let promise = super._handleConnectorURI( payload.url );
        this.requestOptions.headers.delete( 'x-referer' );
        return promise;
    }
}