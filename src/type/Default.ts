export type DataTime = string;
export function isDataTime (dataTime:string|DataTime):dataTime is DataTime {
	const m = (dataTime as DataTime).match(/[\\d|-]/);
	const r = Boolean(m);
	console.debug(m);
	return r;
}
