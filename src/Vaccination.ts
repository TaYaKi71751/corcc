import JSONBig from 'json-bigint';
import { Utilities } from './util/Utilities';
import './parse/VaccinationKeys';
import VaccinationKeys from './parse/VaccinationKeys';
import { Save } from './Save';
import { HTML, DataTime } from './type/Default'
import { URLParams, VaccinationData } from './type/Vaccination';
import { Value } from './type/Default';
import cheerioModule from 'cheerio';
import { exit } from 'process';
class Vaccination extends Utilities {
  response: any;
  pathKeys: any[string] = VaccinationKeys.path;
  parseKeys: any[string] = VaccinationKeys.parse;
  now: any = {};
  parseTime(d?: Date | string): string {
    let dataTime = d ?? this.innerFind({
      html: this.response,
      selectors: ['dataTime']
    }).text().trim();
    dataTime = new Date(dataTime);
    dataTime = this.DateUtilities.dateFormat(dataTime);
    return `"dataTime":"${dataTime}"`;
  }

  numberValue({
    value
  }: Value): Value {
    if (!this.isNumberOnly(value)) {
      return { value };
    }
    if (`${BigInt(value)}` != `${value}`) {
      return { value };
    }
    value = BigInt(value);
    return { value };
  }


  inserTime({ data, time }: DataTime): any {
    const stringified: string = JSONBig.stringify(data);
    const stringifiedWithDataTime: string = stringified.replace("{", `{${time},`);
    const parsedWithDataTime: string = JSONBig.parse(stringifiedWithDataTime);
    return parsedWithDataTime;
  }

  parseInner({
    html
  }: HTML) {
    let parseKey = '';
    const getText = function ({
      element,
      selector
    }: any): string {
      return cheerioModule.load(element)(selector).text().trim();
    }

    const data: VaccinationData = Object.fromEntries(this.sliceEntries(this.now.parseKeys).map(([tag, tagOptions]: any) => {
      let valueString = getText({
        element: html,
        selector: tag
      });
      if (typeof tagOptions != 'string') {
        parseKey =
          tagOptions[this.filterAlphabet(valueString)[0]] ??
          this.filterHangul(valueString);
        return [tag, undefined];
      }
      valueString = this.filterNumber(valueString);
      const { value } = this.numberValue({
        value: valueString
      });
      return [tagOptions, value];
    }).filter(([, _]: any) => (typeof _ != 'undefined')));
    if (parseKey.includes('day')) {
      return [parseKey, this.inserTime({
        data,
        time: (parseKey.includes("yes")
          ? this.parseTime(this.DateUtilities.yester(this.parseTime()))
          : this.parseTime())
      })]
    }
    return [parseKey, data];
  }

  request({
    list
  }: URLParams): string {
    return this.curl(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${list}`);
  }

  scrape(): JSON {
    var vaccinationData: any = {};
    for (const list of Object.keys(this.pathKeys)) {
      try {
        const path: string = this.now.pathKeys = this.pathKeys[list];
        const parse = this.now.parseKeys = this.parseKeys[list];
        const response = this.response = this.request({ list });
        const items = this.innerFind({
          html: response,
          selectors: [
            'item'
          ]
        });
        let data: object = Object.fromEntries(
          items.map((index: number, item: cheerio.Element) => {
            return this.objectEntries(
              this.parseInner({
                html: item
              })
            )
          }));
        data = this.inserTime({
          data,
          time: this.parseTime()
        });
        console.info(path);
        console.info(data);
        vaccinationData[path] = data;
      } catch (e) {
        console.error(this.now.path);
        console.error(this.now.response);
        console.error(e);
        exit(-3);
      }
    }
    console.info(`data`);
    console.info(vaccinationData);
    return vaccinationData;
  }
}
const vaccination = new Vaccination();
try {
  new Save({
    data: vaccination.scrape(),
    name: "vaccination"
  });
} catch (e) {
  console.error(e);
}
