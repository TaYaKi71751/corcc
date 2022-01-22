import {
	CallbackFunctions as CF,
} from '../../src/fetch/case/callbackfn';
import {
	fetchSaveCaseBy,
} from '../../src/fetch/case/FetchSave';

export async function runFetchSaveCase({
	langs,
}: {
	langs: string[]
}) {
	langs.forEach(async (
		lang: string,
		index: number,
		array: string[],
	) => {
		const {
			catchCallbackfn,
			catchCallbackfnOnLastCall,
		} = CF.fetchSaveCaseBy;
		let cb = catchCallbackfn;
		if (array.length == index++) {
			cb = catchCallbackfnOnLastCall;
		}
		await fetchSaveCaseBy({
			lang,
			catchCallbackfn: cb,
		});
	});
};
(async function() {
	await runFetchSaveCase({
		langs: [
			'en',
			// 'cn',
			// 'ko',
		],
	});
})();
