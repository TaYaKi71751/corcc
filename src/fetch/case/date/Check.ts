import { DataTime, isDataTime } from '../../../type/Default';
import { yester } from '../../../util/date/Day';
import { formatDateNow } from '../../../util/date/Format';
import { getMonthDate, getFullYear } from '../../../util/date/format/Parse';

export function dateCheck (d: any):DataTime {
	const dateNow = formatDateNow();
	const dateYester = new Date(yester(dateNow));
	const monthDateNow = getMonthDate(dateNow);
	const monthDateYester = getMonthDate(dateYester);
	const monthDate = getMonthDate(d);
	let r:any;
	switch (monthDate) {
	case monthDateNow:
		r = `${getFullYear(dateNow)}-${monthDateNow}`; break;
	case monthDateYester:
		r = `${getFullYear(dateYester)}-${monthDateYester}`; break;
	default:
		throw new Error(`Date too late ${d}`);
	}
	if (isDataTime(r)) {
		return r;
	} else {
		throw new Error(`Invalid dataTime ${r}`);
	}
}
