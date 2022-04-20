import { DataTime } from './Default';
export type Tpcd = |
	`${string|''}(${'A'|'B'|'C'})${string|''}`|
	'daily'|
	'today'|
	'yesterday'
export function isTpcd (tpcd:string|Tpcd): tpcd is Tpcd {
	const m =	(tpcd as Tpcd).match(
		/\(A\)|\(B\)|\(C\)|daily|today|yesterday/
	);
	const r = Boolean(m?.length);
	return r;
}
export type SidoNm = string
export function isSidoNm (sidoNm:string|SidoNm): sidoNm is SidoNm {
	return (sidoNm as SidoNm) !== undefined;
}
export type Numeric = `${bigint|number}`
export type Optional = {
	dataTime?:DataTime|undefined;
	tpcd?:Tpcd|undefined;
	sidoNm?:SidoNm|undefined;
}
export type Counter = {
	[x:`${string}Cnt`]:Numeric|undefined;
	[x:`${string}Tot`]:Numeric|undefined;
}&Optional
export type Country = {
	[x:string]:Counter;
}&Optional
export type VaccinationData = Counter&Country&{
	counter:Counter|undefined;
	country:Country|undefined;
}

export type URLParams = {
	list: string;
}
