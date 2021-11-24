class CaseSource {
  scheme = 'http';
  domain = 'ncov.mohw.go.kr'
  langPath(lang:string) {
    return {
      'cn': 'cn',
      'en': 'en',
      'ko': undefined,
    }[lang];
  }
  bdBoardList(lang:string) {
    return {
      'cn': 'bdBoardList.do',
      'en': 'bdBoardList.do',
      'ko': 'bdBoardList_Real.do',
    }[lang];
  }
  brdGubun(lang:string) {
    return {
      'cn': '262',
      'en': '162',
      'ko': '13',
    }[lang];
  }
  getUrl({lang}:any) {
    const langPath = this.langPath(lang);
    return `${this.scheme}://${this.domain}/${!langPath ? '' : (langPath + '/')}${this.bdBoardList(lang)}?brdGubun=${this.brdGubun(lang)}`;
  }
}
export = module.exports = CaseSource;