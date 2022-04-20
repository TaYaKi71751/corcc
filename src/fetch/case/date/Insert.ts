import { DataTime, isDataTime } from '../../../type/Default';
import { CaseData } from '../../../type/Case';

export function inserTime (dataTime:DataTime, data:CaseData):CaseData {
	if (
		isDataTime(dataTime)
	) {
		return Object.assign(
			{ dataTime },
			data
		);
	} else {
		throw new Error('Invalid dataTime');
	}
}
