import { VaccinationData } from '../../../type/Vaccination';
import { yester } from '../../../util/date/Day';
import { dateFormat } from '../../../util/date/Format';

export function dayDate (
	tpcd:string,
	body:VaccinationData
): string {
	let { dataTime }: any = body;
	dataTime = Date.parse(dataTime);
	if (tpcd.includes('yes')) {
		return yester(dataTime);
	}
	return dateFormat(dataTime);
}
