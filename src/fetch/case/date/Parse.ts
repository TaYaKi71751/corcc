import {_$} from '../../../util/html/Load';
import {dateCheck} from './Check';

export function parseTime(html: any): string {
	let v: any = {};
	v = _$(html)('.timetable > .info > span');
	v = v.text().trim();
	v = v.split(/[^\d]/).filter((_: string) => {
		let _a:any = _.length;
		_a = _a && _ != '00';
		_a = _a && _ != '0';
		return _a;
	});
	return dateCheck(v.join('-'));
}
