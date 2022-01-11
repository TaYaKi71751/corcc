const oe = Object.entries;
const fe = Object.fromEntries;
export function sortObject(obj: any): object {
	return fe(oe(obj).sort());
}
