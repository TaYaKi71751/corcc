
import { Save } from '../../src/util/Save';
import { fetchCaseBy } from '../../src/fetch/case/Fetch';
import { parse } from '../../src/fetch/case/Parse';
import { exit } from 'process';
export async function fetchSaveCaseBy ({
	lang
}: {
	lang: string,
}) {
	const name = 'case';
	await fetchCaseBy(lang).then((res: any) => {
		console.log(res);
		return parse(res);
	})
		.catch((e: any) => { throw e; })
		.then((data: any) =>	Save({ name, data }))
		.catch((e:any) => { throw e; });
}

function __main__ (retry?:number) {
	[
		'en'
		//	'cn'
	].forEach(async (lang: string, index: number, array: string[]) => {
		await fetchSaveCaseBy({ lang })
			.catch((e: any) => {
				console.error(e);
				if (retry && retry > 0) {
					__main__(retry - 1);
				} else {
					console.error('Out of retry');
					exit(e?.code || -1);
				}
			});
	});
}

__main__(5);
