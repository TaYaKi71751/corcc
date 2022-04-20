import { sortObject } from '../../util/object/Sort';
import { filterNumber } from '../../util/string/Filter';
import { insertTime } from '../vaccination/time/Insert';
import { parseTime } from './date/Parse';
import { parseCountryName, parseTitleName } from './element/Name';
import { selectors as __s__ } from './element/Select';
import * as HTML from 'node-html-parser';
import { DataTime } from '../../type/Default';
const oe = Object.entries;

export function parseData (
	body: string
):{[x:string]:any} {
	console.debug('parseData()');
	const d:string[][] = [];
	const document: HTML.HTMLElement = HTML.parse(body);
	document.querySelectorAll('ul > li')
		.forEach((e: HTML.HTMLElement) => {
			const k: any = parseTitleName(
				`${e.querySelector('span.tit')
					?.text
					?.trim()}`
			);
			const v: any = filterNumber(
				`${e?.querySelector('span.num')
					?.text}`
			);
			if (k) { d.push([k, v]); }
		});
	console.log(sortObject(Object.fromEntries(d)));
	return sortObject(Object.fromEntries(d));
}

export function parseCountry (
	body: string,
	selector: string
) {
	console.debug('parseCountry()');
	const d:Array<[k:string, b:any]> = [];
	const document: any = HTML.parse(body);
	document.querySelectorAll(selector)
		.forEach((e: HTML.HTMLElement) => {
			const c = parseCountryName(e.toString());
			const r = parseData(e.toString());
			console.log(c, r);
			if (c) { d.push([c, r]); }
		});
	return Object.fromEntries(d);
}

export function parseSelect (
	body: string,
	selector: string
) {
	const document = HTML.parse(body);
	const r = document.querySelectorAll(selector);
	if (r.length <= 1) {
		let d:any = parseData(body);
		const t:DataTime = parseTime(body);
		d = insertTime(t, d);
		return d;
	}
	const d:any = parseCountry(
		body,
		selector
	);
	return d;
}

export function parse (b: string) {
	const caseData:Array<[k:string, v:any]> = [];
	oe(__s__).forEach(([p, v]) => {
		const o =	parseSelect(b, v);
		caseData.push(
			[p, o]
		);
	});
	return Object.fromEntries(caseData);
}
