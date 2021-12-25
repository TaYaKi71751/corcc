
export class DateUtil {
  private _24HoursInMillis: number = 86400000;
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
  dateCheck(d: any) : string {
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
        throw new Error(`Date too late ${d}`);
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
}
