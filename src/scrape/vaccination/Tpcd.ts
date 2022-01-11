import {filterAlphabet} from '../../util/string/Filter';

const typeCode: {
	[x: string]: string
} = {
	'A': 'daily', // (C-B)
	'B': 'yesterday', // (C-A)
	'C': 'today', // (B+A)
};

export function codeType(tpcd: string) {
	return typeCode[`${filterAlphabet(tpcd)[0] ?? ''}`] ?? tpcd;
}
