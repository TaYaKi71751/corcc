import {CatchCallbackfnParams} from '../type/callbackfn/fetchSaveCaseBy';

export function catchCallbackfn({
	name,
	lang,
	data,
	error,
}: CatchCallbackfnParams) {
	console.error(`Error Occured during ${lang}`);
	console.error('-----BEGIN DATA-----');
	console.info(`${JSON.stringify(data, null, 2)}`);
	console.error('-----END DATA-----');
	console.error('-----BEGIN NAME-----');
	console.info(`${JSON.stringify(data, null, 2)}`);
	console.error('-----END NAME-----');
	console.error();
	return;
}
export function catchCallbackfnOnLastCall(
	p: CatchCallbackfnParams,
) {
	catchCallbackfn(p);
	const {lang} = p;
	console.error(`Error Occured on last language call: ${lang}`);
	exit(-1);
}
function exit(arg0: number) {
	throw new Error('Function not implemented.');
}

