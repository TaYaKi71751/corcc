import { dateCheck } from './Check';
import * as HTMLParser from 'node-html-parser';
import { DataTime } from '../../../type/Default';

export function parseTime (html:string):DataTime {
	const document = HTMLParser.parse(html);
	const time:any = document
		?.querySelector('.timetable > .info > span')
		?.text
		?.trim()
		?.split(/[^\d]/).filter((_: string) => {
			let _a:any = _.length;
			_a = _a && _ != '00';
			_a = _a && _ != '0';
			return _a;
		});
	return dateCheck(time.join('-'));
}
