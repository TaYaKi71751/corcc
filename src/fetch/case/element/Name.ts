import {HTML} from '../../../type/Default';
import {_$} from '../../../util/html/Load';
import {filterIncludesKeys} from '../../../util/object/Filter';

const titles: any = {
	'确': 'confirmed',
	'解': 'recovered',
	'死': 'deaths',
	'C': 'confirmed',
	'R': 'recovered',
	'D': 'deaths',
	'확진': 'confirmed',
	'해제': 'recovered',
	'사망': 'deaths',
};
const ov = Object.values;

export function parseCountryName({
	html,
}: HTML): string {
	return _$(html)('.cityname').text();
}

export function parseTitleName(title: string): string {
	const _title: any = ov(titles).
		filter((key): any => (title?.toLowerCase()?.
			match(key + '')?.length ?? false))[0] ??
		titles[filterIncludesKeys(titles, title)[0]];
	return _title;
}
