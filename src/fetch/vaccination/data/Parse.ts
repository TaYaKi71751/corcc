import { isDataTime } from '../../../type/Default';
import { VaccinationData, isTpcd, isSidoNm } from '../../../type/Vaccination';
import { dayDate } from '../time/Day';
import { insertTime } from '../time/Insert';
import { codeType } from '../Tpcd';

const oe = Object.entries;
const fe = Object.fromEntries;
export function parseData (body:any) {
	const { items }:any = body;
	const { item }:any = items;
	const itemData:any = {};
	item.forEach((_item:VaccinationData) => {
		let identifier:string|undefined;
		if (
			_item.tpcd &&
			isTpcd(_item.tpcd) &&
			codeType(_item.tpcd) !== _item.tpcd
		) {
			identifier = codeType(_item.tpcd);
		}
		if (
			_item.sidoNm &&
			isSidoNm(_item.sidoNm)
		) {
			identifier = _item.sidoNm;
		}
		if (!identifier) { return; }
		itemData[identifier] = fe(oe(_item).filter(([k, v]) => (
			k != 'tpcd' && k != 'sidoNm'
		)));

		const dataTime = dayDate(identifier, body);
		if (
			!isDataTime(dataTime) ||
			!identifier.match(/(da).*?(y)/)
		) { return; }
		itemData[identifier] = insertTime(
			dataTime,
			itemData[identifier]
		);
	});
	return itemData;
}
