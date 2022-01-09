import JSONBig from 'json-bigint';
import {exit, hasUncaughtExceptionCaptureCallback} from 'process';
import {Utilities} from './util/Utilities';
import CaseParseKeys from './parse/CaseParseKeys';
import CaseSelector from './parse/CaseSelector';
import CaseSource from './source/CaseSource';
import {HTML, DataTime} from './type/Default'; ;
import {Save} from './Save';
import {Title, Value} from './type/Default';
import {CaseData, Lang} from './type/Case';
import 'cheerio';
import cheerioModule from 'cheerio';
class Case extends Utilities {
	url: string | any;
	response: string | any;
	caseParseKeys: any = CaseParseKeys;
	caseSelector = new CaseSelector();
	source = new CaseSource();
	dataTime!: string;
	parseCountryName({
		html,
	}: HTML): string {
		return cheerioModule.load(html)('.cityname').text();
	}

	parseTitle({
		title,
	}: Title): Title {
		title = Object.values(this.caseParseKeys).
			filter((key): any => (title?.toLowerCase()?.
				match(key + '')?.length ?? false))[0] ??
			this.caseParseKeys[this.filterIncludesKeys(this.caseParseKeys, title)[0]];
		return {title};
	}

	numberValue({
		value,
	}: Value): Value {
		if (!this.isNumberOnly(value)) {
			return {value};
		}
		if (`${BigInt(value)}` != `${value}`) {
			return {value};
		}
		value = BigInt(value);
		return {value};
	}

	parseCase({
		html,
	}: HTML): CaseData {
		const getText = ({
			element,
			selector,
		}: any) => {
			element = cheerioModule.load(element);
			return element(selector).text().trim();
		};
		const getTitle = ({
			element,
		}: any) => {
			const title = getText({
				element,
				selector: 'span.tit',
			});
			return this.parseTitle({
				title,
			});
		};
		const getValue = ({
			element,
		}: any) => {
			const value = this.filterNumber(
				getText({
					element,
					selector: 'span.num',
				}),
			);
			return this.numberValue({
				value,
			});
		};
		/** **************************************************
	 * @caseMap                                         *
	 *    inner $(`#mapAll`) || $(`#map_city${number}`) *
	 * **************************************************
	 */
		const caseMap: cheerio.Cheerio = cheerioModule.load(html)('li');
		const caseMapFiltered: cheerio.Cheerio = caseMap.filter((_index: number, caseElement: cheerio.Element) => {
			const {title} = getTitle({
				element: caseElement,
			});
			return typeof title != 'undefined';
		});
		let caseData: any = caseMapFiltered.map((_index: number, caseElement: cheerio.Element) => {
			const {title} = getTitle({
				element: caseElement,
			});
			const {value} = getValue({
				element: caseElement,
			});
			return Object.entries({'': ''}).map(() => {
				return [title, value];
			});
		});
		caseData = this.sortObject(Object.fromEntries(caseData));
		return caseData;
	}
	parseCountry({
		html,
	}: HTML) {
		return Object.fromEntries(Object.entries({'null': 'null'}).map(() => {
			return [this.parseCountryName({
				html,
			}), this.parseCase({
				html,
			})];
		}));
	}
	parseTime({
		html,
	}: HTML): string {
		let v: any = {};
		v = cheerioModule.load(html)(['.timetable', '.info', 'span'].join(' > '));
		v = v.text().trim();
		v = v.split(/[^\d]/).filter((_: string) => (
			_.trim() != '00' ||
			_.trim() != '0'));
		v = v.filter((_:string)=>(_.trim() != '' ));
		return this.DateUtilities.dateCheck(v.join('-'));
	}
	parseMap({
		html,
		selectors,
	}: HTML) {
		let data: any = {};
		data = data ?? data;
		const maps: cheerio.Cheerio = cheerioModule.load(html)(selectors);
		if (!maps.length) {
			throw hasUncaughtExceptionCaptureCallback();
		}
		for (const map of maps.toArray()) {
			const parseData = this.parseCountry({
				html: map,
			});
			const parseDataEntries = Object.entries(parseData)[0];
			if (maps.length > 2) {
				data[parseDataEntries[0]] = parseDataEntries[1];
				continue;
			}
			return parseDataEntries[1];
		}
		return Object.fromEntries(Object.entries(data).filter(([_]) => (_ != '')));
	}

	inserTime({data, time}: DataTime): any {
		const stringified: string = JSONBig.stringify(data);
		const stringifiedWithDataTime: string = stringified.replace('{', `{"dataTime":"${time}",`);
		const parsedWithDataTime: JSON = JSONBig.parse(stringifiedWithDataTime);
		return parsedWithDataTime;
	}

	mohwJson({
		html,
	}: HTML): JSON {
		const rtn = Object.entries(this.caseSelector).map(([path, selectors]) => {
			let data = this.parseMap({
				html,
				selectors,
			});
			const time = this.dataTime;
			data = this.inserTime({
				data,
				time,
			});
			return [path, data];
		});
		return Object.fromEntries(rtn);
	}
	scrape({
		lang,
	}: Lang): JSON {
		try {
			const url = this.url = this.source.getUrl({lang});
			console.info('URL : ', url);
			const res = this.response = this.curl(url);
			this.dataTime = this.parseTime({html: res});
			const data = this.mohwJson({html: res});
			console.info(data);
			return data;
		} catch (e) {
			console.error(this.url);
			console.error(this.response);
			console.error(e);
			throw new Error();
		}
	}
}
const cases = new Case();
try {
	new Save({
		data: cases.scrape({lang: 'en'}),
		name: 'case',
	});
} catch (e) {
	console.error(e);
	try {
		new Save({
			data: cases.scrape({lang: 'cn'}),
			name: 'case',
		});
	} catch (e) {
		console.error(e);
		try {
			new Save({
				data: cases.scrape({lang: 'ko'}),
				name: 'case',
			});
		} catch (e) {
			console.error(e);
			exit(-1);
		}
	}
}
