const ok = Object.keys;
export function filterIncludesKeys(a: object, b: string) {
	return ok(a).filter((_) => (b.includes(_)));
}
export function filterIncludesValues(a: object, b: string) {
	return ok(a).filter((_) => (b.includes(_)));
}
