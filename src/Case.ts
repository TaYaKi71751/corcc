import { exit } from 'process';
import Utilities from './Utilities';
import CaseParseKeys from './type/CaseParseKeys';
import CaseSelector from './type/CaseSelector';
import CaseSource from './source/CaseSource';
class Case extends Utilities {
  caseParseKeys: any = CaseParseKeys;
  caseSelector = new CaseSelector();
  source = new CaseSource();
  constructor() {
    super()
  }
  parseCountryName(_map: any) {
    return this._$(_map)('.cityname').text();
  }

  parseType({
    title
  }: any) {
    return Object.values(this.caseParseKeys).filter((key): any => (title?.toLowerCase()?.match(key + "")?.length ?? false))[0] ?? this.caseParseKeys[this.filterIncludesKeys(this.caseParseKeys, title)[0]];
  }

  numberValue({
    value
  }: any) {
    return this.isNumberOnly(value) ? Number(value) : value;
  }

  parseCase(_map: any) {
    let caseData: any = this.sliceValues(this._$(_map)('li')).map((caseDOM: any) => {
      const title = this._$(caseDOM)('span.tit').text().trim();
      const value = this.filterNumber(this._$(caseDOM)('span.num').text());
      const parseType: any = this.parseType({
        title
      });
      if (!parseType) {
        return;
      }
      return [parseType, this.numberValue({
        value
      })];
    });
    caseData = this.filterType({
      values: caseData,
      valueType: 'undefined',
      match: false
    });
    caseData = Object.fromEntries(caseData);
    caseData = this.sortObject({
      json: caseData
    })
    return caseData;
  }
  parseCountry(_map: any) {
    return Object.fromEntries(Object.entries({ 'null': 'null' }).map(() => {
      return [this.parseCountryName(_map), this.parseCase(_map)];
    }));
  }
  mohwTime(_data: any) {
    let v = this.innerFind({
      DOM: _data,
      selectors: ['.timetable', '.info', 'span']
    }).text().trim();
    v = v.split(/[^\d]/).filter((_: string) => _ != '');
    return this.dateCheck(v.join('-'));
  }
  mohwData({
    path,
    res,
    selectors
  }: any) {
    let data: any = {};
    data = data ?? data;
    const maps = this.sliceValues(this._$(res)(selectors));
    for (const map of maps) {
      const parseData = this.parseCountry(map);
      const parseDataEntries = Object.entries(parseData)[0];
      if (maps.length > 2) {
        data[parseDataEntries[0]] = parseDataEntries[1];
        continue;
      }
      return parseDataEntries[1];
    }
    return Object.fromEntries(Object.entries(data).filter(([_,]) => (_ != '')));
  }
  mohwJson(res: string) {
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
  }: any) {
    const url = this.source.getUrl({ lang });
    console.info('URL : ', url);
    const res = this.curl(url);
    const data = this.mohwJson(res);
    console.info('DATA : ', data);
    return data;
  }
}
const cases = new Case();
try {
  cases.save({
    data: cases.scrape({ lang: 'en' }),
    name: 'case'
  });
} catch (e) {
  console.error(e);
  try {
    cases.save({
      data: cases.scrape({ lang: 'cn' }),
      name: 'case'
    });
  } catch (e) {
    console.error(e);
    try {
      cases.save({
        data: cases.scrape({ lang: 'ko' }),
        name: 'case'
      });
    } catch (e) {
      console.error(e);
      exit(-1);
    }
  }
}