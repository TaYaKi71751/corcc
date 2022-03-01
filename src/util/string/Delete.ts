export function deleteNumber (t: any) {
	return t.replaceAll(/[\d]/g, '');
}
export function deleteAlphabet (t: any) {
	return t.replaceAll(/[A-Za-z]/g, '');
}
export function deleteHangul (t: any) {
	return t.replaceAll(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
}
