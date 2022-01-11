import {_$} from '../../../util/html/Load';
import {dateCheck} from './Check';

export function parseTime(html: any): string {
	let v: any = {};
	v = _$(html)('.timetable > .info > span');
	v = v.text().trim();
	v = v.split(/[^\d]/).filter((_: string) => (
		_.trim() != '00' ||
		_.trim() != '0'));
	v = v.filter((_: string) => (_.trim() != ''));
	return dateCheck(v.join('-'));
}
