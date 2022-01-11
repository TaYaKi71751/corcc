import {HTML} from '../../type/Default';
import {isType} from '../Utilities';
import {parse} from './Parse';

export function innerFind({
	html,
	selectors,
}: HTML): any {
	selectors = selectors ? (isType(selectors[0], 'string') ?
		selectors :
		selectors[0]) : selectors;
	const selector = selectors ? selectors[0] : undefined;
	const _ = parse({html});
	const fHTML = _(selector);
	const rS = selectors?.slice(1, selectors.length) ?? undefined;
	try {
		return rS?.length ?
			(innerFind({
				html: fHTML,
				selectors: rS,
			}) ?? fHTML) :
			fHTML;
	} catch (e) {
		return html;
	}
}
