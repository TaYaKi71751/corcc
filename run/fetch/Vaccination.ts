import { Save } from '../../src/util/Save';
import { fetchVaccinationBy } from '../../src/fetch/vaccination/Fetch';
import { parse } from '../../src/fetch/vaccination/Parse';
import { VaccinationData } from '../../src/type/Vaccination';
import { exit } from 'process';

export async function fetchVaccination () {
	const allResponse = await fetchVaccinationBy('all');
	const sidoResponse = await fetchVaccinationBy('sido');
	const all = await parse(allResponse);
	const sido = await parse(sidoResponse);
	const vaccinationData:VaccinationData = {
		counter: all,
		country: sido
	};
	Save({
		data: vaccinationData,
		name: 'vaccination'
	});
}

fetchVaccination()
	.catch((e:any) => { console.error(e); exit(-1); });
