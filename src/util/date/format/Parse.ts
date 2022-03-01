export function getFullYear (d: Date | string): number {
	return new Date(d).getFullYear();
}
export function getMonth (d: Date | string): string {
	d = '' + (new Date(d).getMonth() + 1);
	return (d.length < 2) ? ('0' + d) : d;
}
export function getDate (d: Date | string): string {
	d = '' + (new Date(d).getDate());
	return (d.length < 2) ? ('0' + d) : d;
}
export function getMonthDate (d: Date | string): string {
	return `${getMonth(d)}-${getDate(d)}`;
}
