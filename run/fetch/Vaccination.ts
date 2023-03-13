import { Save } from '../../src/util/Save';
import { fetchVaccinationBy } from '../../src/fetch/vaccination/Fetch';
import { parse } from '../../src/fetch/vaccination/Parse';
import { VaccinationData } from '../../src/type/Vaccination';
import { exit } from 'process';

export async function fetchVaccination () {
	const allResponse = await fetchVaccinationBy('all');
	const sidoResponse = await fetchVaccinationBy('sido');
	console.log(
		'-----------------__VACCINATION_ALL_HTTP_RESPONSE_BODY_START__-----------------\n',
		allResponse, '\n',
		'------------------__VACCINATION_ALL_HTTP_RESPONSE_BODY_END__------------------\n'
	);
	console.log(
		'-----------------__VACCINATION_SIDO_HTTP_RESPONSE_BODY_START__-----------------\n',
		sidoResponse, '\n',
		'------------------__VACCINATION_SIDO_HTTP_RESPONSE_BODY_END__------------------\n'
	);
	const all = await parse(allResponse);
	const sido = await parse(sidoResponse);
	console.log(
		'-----------------__VACCINATION_ALL_JSON_STRING_START__-----------------\n',
		all, '\n',
		'------------------__VACCINATION_ALL_JSON_STRING_END__------------------\n'
	);
	console.log(
		'-----------------__VACCINATION_SIDO_JSON_STRING_START__-----------------\n',
		sido, '\n',
		'------------------__VACCINATION_SIDO_JSON_STRING_END__------------------\n'
	);

	const vaccinationData:VaccinationData = {
		counter: all,
		country: sido
	};
	Save({
		data: vaccinationData,
		name: 'vaccination'
	});
}

function __main__ (retry?:number) {
	fetchVaccination()
		.catch((e:any) => {
			console.error(
				'[Error]',
				e, '\n'
			);
			if (retry && retry > 0) {
				__main__(retry - 1);
			} else {
				console.error('Out of retry');
				exit(e?.code || -1);
			}
		});
}
__main__(5);
