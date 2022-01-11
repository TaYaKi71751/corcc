import {Save} from '../util/Save';
import {fetchVaccination} from './vaccination/Fetch';
import {parse} from './vaccination/Parse';

(async function() {
	const allResponse = await fetchVaccination({
		list: 'all',
	});
	const sidoResponse = await fetchVaccination({
		list: 'sido',
	});
	const all = await parse(allResponse);
	const sido = await parse(sidoResponse);
	const vaccinationData: any = (function() {
		const r:any = {};
		r['counter'] = all;
		r['country'] = sido;
		return r;
	})();
	new Save({
		data: vaccinationData,
		name: 'vaccination',
	});
})();
