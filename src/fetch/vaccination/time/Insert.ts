import { DataTime } from '../../../type/Default';
import { VaccinationData } from '../../../type/Vaccination';

export function insertTime (
	dataTime: DataTime,
	itemData: VaccinationData
):VaccinationData {
	return Object.assign(
		{ dataTime },
		itemData
	);
}
