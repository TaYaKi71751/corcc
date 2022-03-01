const oe = Object.entries;
const ov = Object.values;
export function sliceEntries (v: any) {
	return oe(v).slice(0, v.length);
}
export function sliceValues (v: any) {
	return ov(v).slice(0, v.length);
}
