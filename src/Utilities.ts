import { config } from 'dotenv';
import 'child_process';
import './Write'
import { execSync } from 'child_process';
import 'cheerio';
import { load } from 'cheerio';
import writeJson from './Write';

class Utilities {
  _$ = load;
  private _24HoursInMillis: number = 86400000;
  toObject(array: any) {
    var _:any = {};
    for (var i = 0; i < array.length; i++) {
      const __:any = array[i];
      _[__[0]] = __[1];
    }
    return _;
  }
  sortObject({
    json
  }:any){
    return Object.fromEntries(Object.keys(json).sort().map((key)=>{
      return [key,json[key]];
    }));
  }
  save({
    data,
    name
  }:any) {
    writeJson(data, `/latest/`, `${name}`);
    Object.entries(data).forEach(([k, v]: any) => {
      if (Object.values(v).filter((_) => (typeof _ == 'string')).length > 1) {
        writeJson(v, `/${name}`);
      }
      writeJson(v, `/latest/${name}/`, k);
      writeJson(v, `/${name}`, k);
      writeJson(v, `/${name}/${k}`);
      writeJson(v, `/${name}/${k}`, v['dataTime']);
    });
  }

  filterType({
    values,
    valueType,
    match
  }:any) : boolean{
    return values.filter((value:any)=>{
      return !((match??true) ^ (valueType?.includes(typeof value)));
    })
  }

  sliceEntries(v: any) {
    return Object.entries(v).slice(0, v.length);
  }
  sliceValues(v: any) {
    return Object.values(v).slice(0, v.length);
  }
  curl(url: string) {
    return execSync(`curl -LsSf ${url} -A "${process.env.USER_AGENT}" -o -`).toString();
  }
  dateFormat(d: any) {
    d = new Date(d);
    return [this.getFullYear(d), this.getMonth(d), this.getDate(d)].join('-');
  }
  yester(dataTime: any) {
    return this.dateFormat(new Date(Date.parse(dataTime) - (this._24HoursInMillis)));
  }
  nowDate() {
    return new Date(this.dateFormat(new Date()));
  }
  dateCheck(d: any) {
    const dateNow = this.nowDate();
    const dateYester = this.yester(dateNow);
    const monthDateNow = this.getMonthDate(dateNow);
    const monthDateYester = this.getMonthDate(dateYester);
    const monthDate = this.getMonthDate(d);
    switch (monthDate) {
      case monthDateNow:
        return `${this.getFullYear(dateNow)}-${monthDateNow}`;
      case monthDateYester:
        return `${this.getFullYear(dateYester)}-${monthDateYester}`;
      default:
        return null;
    }
  }
  getMonth(d: Date | string): string {
    d = '' + (new Date(d).getMonth() + 1);
    return (d.length < 2) ? ('0' + d) : d;
  }
  getDate(d: Date | string): string {
    d = '' + (new Date(d).getDate());
    return (d.length < 2) ? ('0' + d) : d;
  }
  getMonthDate(d: Date | string): string {
    return `${this.getMonth(d)}-${this.getDate(d)}`;
  }
  getFullYear(d: Date | string): number {
    return new Date(d).getFullYear();
  }
  newDate(): string {
    return this.dateFormat(new Date());
  }
  isType(variable: any, variable_type: string): boolean {
    return !(typeof variable != variable_type);
  }
  parse({ DOM }: any): cheerio.Root {
    return this._$(((typeof DOM.html == 'undefined') ? this._$(DOM) : DOM).html());
  }
  innerFind({
    DOM,
    selectors
  }: any): any {
    selectors = selectors ? (this.isType(selectors[0], 'string')
      ? selectors
      : selectors[0]) : undefined;
    var _ = this.parse({DOM});
    var SDOM = _(selectors[0]);
    var rS = selectors.slice(1, selectors.length);
    try {
      return rS.length ?
        (this.innerFind({
          DOM: SDOM,
          selectors: rS
        }) ?? SDOM)
        : SDOM;
    } catch (e) {
      return DOM;
    }
  }
  entries(a: object) {
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