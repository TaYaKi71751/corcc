import {yester} from '../../../util/date/Day';
import {formatDateNow} from '../../../util/date/Format';
import {getMonthDate, getFullYear} from '../../../util/date/format/Parse';

export function dateCheck(d: any): string {
	const dateNow = formatDateNow();
	const dateYester = yester(dateNow);
	const monthDateNow = getMonthDate(dateNow);
	const monthDateYester = getMonthDate(dateYester);
	const monthDate = getMonthDate(d);
	switch (monthDate) {
	case monthDateNow:
		return `${getFullYear(dateNow)}-${monthDateNow}`;
	case monthDateYester:
		return `${getFullYear(dateYester)}-${monthDateYester}`;
	default:
		throw new Error(`Date too late ${d}`);
	}
}
