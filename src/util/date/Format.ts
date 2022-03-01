import { getDate, getFullYear, getMonth } from './format/Parse';

export function dateFormat (d: any) {
	d = new Date(d);
	return [getFullYear(d), getMonth(d), getDate(d)].join('-');
}

export function formatDateNow () {
	return new Date(dateFormat(new Date()));
}

export function formatNow (): string {
	return dateFormat(new Date());
}
