import { Tpcd } from '../../type/Vaccination';
import { filterAlphabet } from '../../util/string/Filter';

const typeCode: {
	[x: string]: string
} = {
	A: 'daily', // (C-B)
	B: 'yesterday', // (C-A)
	C: 'today' // (B+A)
};

export function codeType (tpcd:Tpcd) {
	let _a = typeCode[`${filterAlphabet(tpcd)[0] ?? ''}`];
	if (!_a) {
		_a = typeCode[tpcd ?? ''];
		if (!_a) {
			_a = tpcd;
		}
	}
	return _a;
}
