import {_$} from '../../util/html/Load';
import {sortObject} from '../../util/object/Sort';
import {filterNumber} from '../../util/string/Filter';
import {insertTime} from '../vaccination/time/Insert';
import {parseTime} from './date/Parse';
import {parseTitleName} from './element/Name';
import {selectors as __s__} from './element/Select';
const oe = Object.entries;
const ov = Object.values;


export function parseData({
	body,
}: {
    body: string
}) {
	let d: any = {};
	(function(b: any) {
		let l: any = _$(b)('ul > li');
		l = ov(l).slice(0, l.length);
		l.forEach((e: any) => {
			let t: any = _$(e)('span.tit');
			t = t.text();
			t = t.trim();
			t = parseTitleName(t);
			if (!t) {
				return;
			}
			// console.log(_$(e).html());
			let n: any = _$(e)('span.num');
			n = n.text();
			n = filterNumber(n);
			d[t] = n;
		});
	})(body);
	d=sortObject(d);
	return d;
}

export function parseCountry({
	body,
	selector,
}: {
    body: string,
    selector: string
}) {
	const d: any = {};
	(function(b: string, s: string) {
		let _:any = _$(b)(s);
		_ = ov(_).slice(0, _.length);
		_.forEach((e: any) => {
			let c: any = _$(e)('.cityname');
			c = c.text();
			c = c.trim();
			if (!c) {
				return;
			}
			console.log(c);
			const r = parseData({
				body: e,
			});
			console.log(r);
			d[c] = r;
		});
	})(body, selector);
	return d;
}

export function parseSelect({
	body,
	selector,
}: {
    body: string,
    selector: string
}) {
	return (function(b: string, s: string) {
		const _s: cheerio.Cheerio = _$(b)(s);
		if (_s.length <= 1) {
			let d:any = parseData({
				body: _s.html() ?? '',
			});
			const t:any = parseTime(body);
			d = insertTime({
				dataTime: t,
				itemData: d,
			});
			return d;
		}
		const d:any = parseCountry({
			body,
			selector,
		});
		return d;
	})(body, selector);
}

export function parse(b: string) {
	const caseData: any = {};
	oe(__s__).forEach(([p, v]) => {
		caseData[p] = parseSelect({
			body: b,
			selector: v,
		});
	});
	return caseData;
}

