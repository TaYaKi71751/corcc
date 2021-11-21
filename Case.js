const { execSync } = require('child_process');
const { exit } = require('process');
const Utilities = require('./Utilities');
const { writeJson } = require('./write');
class Case extends Utilities {
  caseParseKeys = require('./type/CaseParseKeys');
  caseSelector = new (require('./type/CaseSelector'))();
  source = new (require('./source/CaseSource'))();
  constructor() {
    super()
  }
  parseCountryName(_map) {
    return this._$(_map)('.cityname').text();
  }
  parseCase(_map) {
    var caseData = {};
    this.sliceValues(this._$(_map)('li')).forEach((case_) => {
      const a = this._$(case_)('span.tit').text().trim();
      const b = this.filterNumber(this._$(case_)('span.num').text());
      if (this.includesAlphabet(a)) {
        const parseType = this.caseParseKeys[a[0]];
        if (!parseType) {
          return;
        }
        caseData[parseType] = (this.isNumberOnly(b) ? Number(b) : b);
      } else {
        const parseType = this.caseParseKeys[this.filterIncludesKeys(this.caseParseKeys,a)[0]];
        if (!parseType) { return; }
        caseData[parseType] = (this.isNumberOnly(b) ? Number(b) : b);
      }
    });
    return caseData;
  }
  parseCountry(_map) {
    var countryCaseData = {};
    countryCaseData[this.parseCountryName(_map)] = this.parseCase(_map);
    return countryCaseData;
  }
  mohwTime(_data) {
    var v = this.innerFind(_data, '.timetable', '.info', 'span').text().trim();
    v = v.split(/[^\d]/).filter((_) => _ != '');
    return this.dateCheck(v.join('-'));
  }
  mohwData({
    path,
    res,
    selectors
  }){
    var data = {};
    const maps = this.sliceValues(this._$(res)(selectors));
    for(var i = 0;i < maps.length;i++){
      const parseData = this.parseCountry(maps[i]);
      const parseDataEntries = Object.entries(parseData);
      
      if (path != 'counter') {
        data[parseDataEntries[0][0]] = parseDataEntries[0][1];
        continue;
      }
      return parseDataEntries[0][1];
    }
    return data;
  }
  mohwJson(res) {
    const rtn = Object.entries(this.caseSelector).map(([path, selectors]) => {
      return [path, JSON.parse(JSON.stringify(this.mohwData({
        path,
        res,
        selectors
      })).replace("{", "{" + `"dataTime":"${this.mohwTime(this._$(res))}",`))];
    });
    return Object.fromEntries(rtn);
  }
  scrape({
    lang
  }) {
    const url = this.source.getUrl(this.lang = lang);
    console.log(url);
    const res = this.curl(url);
    var data = this.mohwJson(res);
    console.log(data);
    return data;
  }
}
var test = new Case();
const save = function(d){
  writeJson(d,`/latest/`,`case`);
  Object.entries(d).forEach(([k,v])=>{
    if(Object.values(v).filter((_)=>(typeof _ == 'string')).length > 1){
      writeJson(v,`/case`);
    }
    writeJson(v,`/latest/case/`,k);
    writeJson(v,`/case`,k);
    writeJson(v,`/case/${k}`);
    writeJson(v,`/case/${k}`,v['dataTime']);
  });
}
try{
  save(test.scrape({ lang: 'en' }));
}catch(e){
  console.error(e);
  try{
    save(test.scrape({ lang: 'cn' }));
  }catch(e){
    console.error(e);
    try{
      save(test.scrape({ lang: 'ko' }));
    }catch(e){
      console.error(e);
      exit(-1);
    }
  }
}