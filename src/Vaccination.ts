const { execSync } = require('child_process');
const { exit } = require('process');
import Utilities from './Utilities';
import './type/VaccinationKeys';
import VaccinationKeys from './type/VaccinationKeys';
class Vaccination extends Utilities {
  response: any;
  pathKeys: any[string] = VaccinationKeys.path;
  parseKeys: any[string] = VaccinationKeys.parse;
  constructor() {
    super();
  }

  splitItems(dom: any) {
    return this.sliceValues(this.innerFind({
      DOM: dom,
      selectors: [
        'item'
      ]
    }));
  }

  parseDataTime(d?: Date | string) {
    var dataTime = d ?? this.innerFind({
      DOM: this.response,
      selectors: ['dataTime']
    }).text().trim();
    dataTime = new Date(dataTime);
    dataTime = this.dateFormat(dataTime);
    return `"dataTime":"${dataTime}"`;
  }

  inserTime({data, dataTime}:any) : any {
    const stringified:string = JSON.stringify(data);
    const stringifiedWithDataTime:string = stringified.replace("{", `{${dataTime},`);
    const parsedWithDataTime:string = JSON.parse(stringifiedWithDataTime);
    return parsedWithDataTime;
  }

  parseInner({
    ITEM_DOM,
    PARSE_KEYS
  }: any) {
    var parseKey = ''
      , data = Object.fromEntries(this.sliceEntries(PARSE_KEYS).map(([tag, tagOptions]: any) => {
        const value = this._$(ITEM_DOM)(tag).text().trim();
        if (typeof tagOptions != 'string') {
          parseKey =
            tagOptions[this.filterAlphabet(value)[0]] ??
            this.filterHangul(value);
          return [tag, undefined];
        }
        return [tagOptions, Number(this.filterNumber(value))];
      }).filter(([, _]: any) => (typeof _ != 'undefined')));
    if (parseKey.includes('day')) {
      return [parseKey, this.inserTime({
        data,
        dataTime: (parseKey.includes("yes")
          ? this.parseDataTime(this.yester(this.parseDataTime()))
          : this.parseDataTime())
      })]
    }
    return [parseKey, data];
  }

  request({
    list
  }: any) {
    return this.curl(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${list}`);
  }

  scrape() {
    const rtn:object = Object.keys(this.pathKeys).map((list) => {
      const path = this.pathKeys[list];
      const parse = this.parseKeys[list];
      const response = this.request({ list });
      this.response = response;
      const items = this.innerFind({
        DOM: response,
        selectors: [
          'item'
        ]
      });
      const data = this.toObject(this.sliceValues(items).map((item: any) => {
        return this.parseInner({
          ITEM_DOM: item,
          PARSE_KEYS: parse
        });
      }));
      return [path,
        this.inserTime({
          data,
          dataTime: this.parseDataTime()
        })];
    });
    return this.toObject(rtn);
  }
}
var test = new Vaccination();
try {
  // test.scrape();
  test.save({
    data:test.scrape(),
    name:"vaccination"
  });
} catch (e) {
  console.error(e);
}
