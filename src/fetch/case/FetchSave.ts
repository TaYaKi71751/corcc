import {Save} from '../../util/Save';
import {fetchCaseBy} from './Fetch';
import {parse} from './Parse';
import {CatchCallbackfn} from './type/callbackfn/fetchSaveCaseBy';
export async function fetchSaveCaseBy({
	lang,
	catchCallbackfn,
}: {
	lang: string,
	catchCallbackfn?: CatchCallbackfn
}) {
	const name = 'case';
	let data: any = {};
	try {
		data = await fetchCaseBy({
			lang,
		});
		data = parse(data);
		console.info(data);
		new Save({
			data,
			name,
		});
	} catch (e: any | ErrorEvent) {
		if (catchCallbackfn) {
			return catchCallbackfn({
				name,
				lang,
				data,
				error: e,
			});
		}
	}
}
