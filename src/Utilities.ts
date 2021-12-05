import { config } from 'dotenv';
import { execSync } from 'child_process';
import 'cheerio';
import { load } from 'cheerio';
import { HTML } from './type/Default';
import { DateUtil } from './DateUtil';
class Utilities {
  DateUtilities:DateUtil = new DateUtil();
  _$ = load;
  toObject(array: any) : JSON {
    let _: any = {};
    _ = _ ?? _;
    for (const i of array) {
      const __: any = i;
      _[__[0]] = __[1];
    }
    return _;
  }
  sortObject(obj: any) : object {
    return Object.fromEntries(Object.entries(obj).sort());
  }

  filterType({
    values,
    valueType,
    match
  }: any): boolean {
    return values.filter((value: any) => {
      return !((match ?? true) ^ (valueType?.includes(typeof value)));
    })
  }

  sliceEntries(v: any) {
    return Object.entries(v).slice(0, v.length);
  }
  sliceValues(v: any) {
    return Object.values(v).slice(0, v.length);
  }
  curl(url: string) : string {
    return execSync(`curl -LsSf ${url} -A "${process.env.USER_AGENT}" -o -`).toString();
  }
  isType(variable: any, variableType: string): boolean {
    return !(typeof variable != variableType);
  }
  parse({ html }: HTML): cheerio.Root {
    return this._$((this._$(html) ?? html).html());
  }
  innerFind({
    html,
    selectors
  }: HTML): any {
    selectors = selectors ? (this.isType(selectors[0], 'string')
      ? selectors
      : selectors[0]) : selectors;
    const selector = selectors ? selectors[0] : undefined;
    const _ = this.parse({ html });
    const fHTML = _(selector);
    const rS = selectors?.slice(1, selectors.length)??undefined;
    try {
      return rS?.length ?
        (this.innerFind({
          html: fHTML,
          selectors: rS
        }) ?? fHTML)
        : fHTML;
    } catch (e) {
      return html;
    }
  }
  entries(a: object) : object {
    return Object.entries(a);
  }
  filterIncludesKeys(a: object, b: string) {
    return Object.keys(a).filter((_) => (b.includes(_)))
  }
  filterIncludesValues(a: object, b: string) {
    return Object.values(a).filter((_) => (b.includes(_)))
  }
  includesNumber(t: string) {
    return t.match(/[\d]/);
  }
  includesAlphabet(t: string) {
    return t.match(/[A-Za-z]/);
  }
  includesHangul(t: string) {
    return t.match(/[가-힣ㄱ-ㅎㅏ-ㅣ]/);
  }
  deleteNumber(t: any) {
    return t.replaceAll(/[\d]/g, "");
  }
  deleteAlphabet(t: any) {
    return t.replaceAll(/[A-Za-z]/g, "");
  }
  deleteHangul(t: any) {
    return t.replaceAll(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  }
  filterNumber(t: any) {
    return t.replaceAll(/[^\d]/g, "");
  }
  filterAlphabet(t: any) {
    return t.replaceAll(/[^A-Za-z]/g, "");
  }
  filterHangul(t: any) {
    return t.replaceAll(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  }
  isNumberOnly(t: any) {
    return t == this.filterNumber(t);
  }
}
module.exports = Utilities;
export = Utilities;