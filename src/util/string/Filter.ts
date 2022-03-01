export function filterNumber (t: any) {
	return t.replaceAll(/[^\d]/g, '');
}
export function filterAlphabet (t: any) {
	return t.replaceAll(/[^A-Za-z]/g, '');
}
export function filterHangul (t: any) {
	return t.replaceAll(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
}
