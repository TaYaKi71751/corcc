import * as HTML from 'node-html-parser';
import { filterIncludesKeys } from '../../../util/object/Filter';

const titles:{[x:string]:string} = {
	确: 'confirmed',
	解: 'recovered',
	死: 'deaths',
	C: 'confirmed',
	R: 'recovered',
	D: 'deaths',
	확진: 'confirmed',
	해제: 'recovered',
	사망: 'deaths'
};
const ov = Object.values;

export function parseCountryName (
	html:string
): string {
	const document = HTML.parse(html);
	const name = document
		.querySelector('.cityname')
		?.text
		?.trim();
	if (typeof name == 'string') { return name; }
	throw new Error(`${JSON.stringify(name)}`);
}

export function parseTitleName (title: string): string {
	const _title: any = ov(titles)
		.filter((key): any => (title?.toLowerCase()
			?.match(key + '')?.length ?? false))[0] ??
		titles[filterIncludesKeys(titles, title)[0]];
	return _title;
}
