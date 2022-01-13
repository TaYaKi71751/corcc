import {filterAlphabet, filterHangul} from '../../../util/string/Filter';
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
		if (tpcd != filterAlphabet(tpcd)) {
			if (tpcd != filterHangul(tpcd)) {
				throw new Error(`Invalid value ${tpcd}`);
			}
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
