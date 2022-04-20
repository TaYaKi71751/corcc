import { DataTime } from './Default';
export type NumericValue = `${number|bigint}`
export function isNumericValue (numericValue:string|NumericValue):numericValue is NumericValue {
	const m = (numericValue as NumericValue)
		.match(/^[0-9]+$/);
	const r = Boolean(m);
	console.debug(m, r);
	return r;
}
export type Counter = {
	dataTime?:DataTime;
	confirmed: NumericValue;
	deaths: NumericValue;
	recovered: NumericValue;
}
export function isCounter (counter:any|Counter):counter is Counter {
	return (
		counter?.confirmed !== undefined &&
		counter?.deaths !== undefined &&
		counter?.recovered !== undefined
	);
}
export type Country = {[x:string]:Counter;}
export type CaseData = Counter|Country|{
	counter:CaseData;
	country:{[x:string]:CaseData};
}

export type Lang = {
	lang: string;
}
