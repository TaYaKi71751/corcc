import {exit} from 'process';
import {Save} from '../util/Save';
import {fetchCase} from './case/Fetch';
import {parse} from './case/Parse';

(async function() {
	const name = 'case';
	let data: any = {};
	try {
		data = await fetchCase({lang: 'en'});
		data = parse(data);
		console.info(data);
		new Save({
			data,
			name,
		});
	} catch (e: any) {
		console.error(e.message);
		try {
			data = await fetchCase({lang: 'cn'});
			data = parse(data);
			console.info(data);
			new Save({
				data,
				name,
			});
		} catch (e) {
			try {
				data = await fetchCase({lang: 'cn'});
				data = parse(data);
				console.info(data);
				new Save({
					data,
					name,
				});
			} catch (e: any) {
				console.error(e.message);
				exit(0xFF);
			}
		}
	}
})();
