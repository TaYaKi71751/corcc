import {dateFormat} from './Format';
const _24HoursInMillis: number = 86400000;
export function yester(dataTime: any) {
	return dateFormat(new Date(
		((typeof dataTime == 'string') ?
			Date.parse(dataTime) : dataTime) -
		(_24HoursInMillis)));
}
