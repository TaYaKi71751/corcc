import { CaseData } from '../type/Case';
import { VaccinationData } from '../type/Vaccination';
import { writeRecurive } from './WriteRecurive';
export function Save ({
	data,
	name
}:{
	data:CaseData|VaccinationData
	name:string
}) {
	if (typeof data == 'undefined') {
		throw new TypeError();
	}
	writeRecurive({
		data,
		path: ['artifacts', name]
	});

	writeRecurive({
		data,
		path: ['artifacts', 'latest', name]
	});
}
