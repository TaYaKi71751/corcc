import { dateFormat } from '../../../util/date/Format';

export function parseTime (body: any) {
	let { dataTime }: any = body;
	dataTime = dateFormat(dataTime);
	return dataTime;
}
