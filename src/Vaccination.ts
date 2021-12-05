import Utilities from './Utilities';
import './parse/VaccinationKeys';
import VaccinationKeys from './parse/VaccinationKeys';
import { Save } from './Save';
import { HTML, DataTime } from './type/Default'
import { URLParams, VaccinationData } from './type/Vaccination';
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

  inserTime({ data, time }: DataTime): any {
    const stringified: string = JSON.stringify(data);
    const stringifiedWithDataTime: string = stringified.replace("{", `{${time},`);
    const parsedWithDataTime: string = JSON.parse(stringifiedWithDataTime);
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
      const value = getText({
        element: html,
        selector: tag
      });
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
