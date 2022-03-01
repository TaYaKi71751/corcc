import { filterNumber } from './Filter';

export function includesNumber (t: string) {
	return t.match(/[\d]/);
}
export function includesAlphabet (t: string) {
	return t.match(/[A-Za-z]/);
}
export function includesHangul (t: string) {
	return t.match(/[가-힣ㄱ-ㅎㅏ-ㅣ]/);
}
export function isNumberOnly (t: any) {
	return t == filterNumber(t);
}
