import { DataTime } from '../../../type/Default';
import { VaccinationData } from '../../../type/Vaccination';
import { dateFormat } from '../../../util/date/Format';

export function parseTime (body:VaccinationData):DataTime {
	let { dataTime } = body;
	dataTime = dateFormat(dataTime);
	return dataTime;
}
