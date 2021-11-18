class CaseSource {
  scheme = 'http';
  domain = 'ncov.mohw.go.kr'
  langPath(lang) {
    return {
      'cn': 'cn',
      'en': 'en',
      'ko': undefined,
    }[lang];
  }
  bdBoardList(lang) {
    return {
      'cn': 'bdBoardList.do',
      'en': 'bdBoardList.do',
      'ko': 'bdBoardList_Real.do',
    }[lang];
  }
  brdGubun(lang) {
    return {
      'cn': '262',
      'en': '162',
      'ko': '13',
    }[lang];
  }
  getUrl(lang) {
    const langPath = this.langPath(lang);
    return `${this.scheme}://${this.domain}/${!langPath ? '' : (langPath + '/')}${this.bdBoardList(lang)}?brdGubun=${this.brdGubun(lang)}`;
  }
}
module.exports = CaseSource;