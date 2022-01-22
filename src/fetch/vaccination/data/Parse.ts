import {dayDate} from '../time/Day';
import {insertTime} from '../time/Insert';
import {codeType} from '../Tpcd';

const oe = Object.entries;
const fe = Object.fromEntries;
export function parseData(body: any) {
	const {items}: any = body;
	const {item}: any = items;
	const itemData: any = {};
	item.forEach((_item: any) => {
		let {tpcd}: any = _item;
		if (!tpcd) {
			tpcd = _item.sidoNm;
		}
		tpcd = codeType(tpcd);
		if (!tpcd) {
			if (!tpcd.match(/^[(|)| |A-Z|a-z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9]+$/).length) {
				console.warn(`${tpcd} is may not a valid value`);
			}
			throw Error(`${tpcd} is not a valid value`);
		}
		itemData[tpcd] = fe(oe(_item).filter(([k, v]) => (
			k != 'tpcd' && k != 'sidoNm'
		)));
		const dataTime = dayDate({
			tpcd,
			body,
		});
		if (!tpcd.match(/(da).*?(y)/)) {
			return;
		}
		itemData[tpcd] = insertTime({
			dataTime,
			itemData: itemData[tpcd],
		});
	});
	return itemData;
}
