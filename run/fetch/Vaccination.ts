import {Save} from '../../src/util/Save';
import {fetchVaccinationBy} from '../../src/fetch/vaccination/Fetch';
import {parse} from '../../src/fetch/vaccination/Parse';

export async function fetchVaccination() {
	const allResponse = await fetchVaccinationBy({
		list: 'all',
	});
	const sidoResponse = await fetchVaccinationBy({
		list: 'sido',
	});
	const all = await parse(allResponse);
	const sido = await parse(sidoResponse);
	const vaccinationData: any = (function() {
		const r: any = {};
		r['counter'] = all;
		r['country'] = sido;
		return r;
	})();
	console.info(vaccinationData);
	new Save({
		data: vaccinationData,
		name: 'vaccination',
	});
}

fetchVaccination();
