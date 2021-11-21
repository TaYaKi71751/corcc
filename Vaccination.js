const { execSync } = require('child_process');
const { exit } = require('process');
const Utilities = require('./Utilities');
const { writeJson } = require('./write');

class Vaccination extends Utilities {
  pathKeys = new (require('./type/VaccinationKeys'))().path;
  parseKeys = new (require('./type/VaccinationKeys'))().parse;
  constructor() {
    super();
  }

  splitItems({
    DOM
  }) {
    return sliceValues(this.innerFind(DOM, 'item'));
  }

  parseDataTime() {
    var dataTime = this.innerFind(this.response, 'dataTime').text().trim();
    dataTime = new Date(dataTime);
    dataTime = this.dateFormat(dataTime);
    return `"dataTime":"${dataTime}"`;
  }

  inserTime({
    data,
    dataTime
  }) {
    const stringified = JSON.stringify(data);
    const stringifiedWithDataTime = stringified.replace("{", `{${dataTime},`);
    const parsedWithDataTime = JSON.parse(stringifiedWithDataTime);
    return parsedWithDataTime;
  }

  parseInner({
    ITEM_DOM,
    PARSE_KEYS
  }) {
    var parseKey = ''
      , data = [];
    data = Object.fromEntries(this.sliceEntries(PARSE_KEYS).map(([tag, tagOptions]) => {
      const value = this._$(ITEM_DOM)(tag).text().trim();
      if (typeof tagOptions != 'string') {
        parseKey =
          tagOptions[this.filterAlphabet(value)[0]] ??
          this.filterHangul(value);
        return [tag, undefined];
      }
      return [tagOptions, Number(this.filterNumber(value))];
    }).filter(([, _]) => (typeof _ != 'undefined')));
    if(parseKey.includes('day')){
      return [parseKey,this.inserTime({
        data,
        dataTime: this.parseDataTime()
      })]
    }
    return [parseKey, data];
  }

  request({
    list
  }) {
    return this.curl(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${list}`);
  }

  scrape() {
    const rtn = Object.keys(this.pathKeys).map((list) => {
      const path = this.pathKeys[list];
      const parse = this.parseKeys[list];
      const response = this.request({ list });
      this.response =  response;
      const items = this.innerFind(response, 'item');
      const data = this.sliceValues(items).map((item) => {
        return this.parseInner({
          ITEM_DOM: item,
          PARSE_KEYS: parse
        });
      });
      return [path,
      this.inserTime({
        data: this.toObject({array:data}),
        dataTime: this.parseDataTime({ res: response })
      })];
    });
    return this.toObject({ array: rtn });
  }
}
var test = new Vaccination();
const save = function (d) {
  writeJson(d, `/latest/`, `vaccination`);
  Object.entries(d).forEach(([k, v]) => {
    if (Object.values(v).filter((_) => (typeof _ == 'string')).length > 1) {
      writeJson(v, `/vaccination`);
    }
    writeJson(v, `/latest/vaccination/`, k);
    writeJson(v, `/vaccination`, k);
    writeJson(v, `/vaccination/${k}`);
    writeJson(v, `/vaccination/${k}`, v['dataTime']);
  });
}
try {
  save(test.scrape({ lang: 'en' }));
} catch (e) {
  console.error(e);
}