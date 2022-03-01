import { _$ } from '../../../util/html/Load';
import { filterNumber } from '../../../util/string/Filter';
import { parseTitleName } from './Name';

export function getText (e: any, s: any) {
	const _e = _$(e);
	return _e(s).text().trim();
}
export function getValue (e: any) {
	const value = filterNumber(
		getText(e, 'span.num')
	);
	return value.trim();
}
export function getTitle (e: any) {
	const title = getText(e, 'span.tit');
	return parseTitleName(title);
};
