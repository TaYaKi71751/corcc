export function filterType({
	values,
	valueType,
	match,
}: any): boolean {
	return values.filter((value: any) => {
		return !((match ?? true) ^ (valueType?.includes(typeof value)));
	});
}

export function isType(variable: any, variableType: string): boolean {
	return !(typeof variable != variableType);
}
