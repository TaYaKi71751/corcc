import { Data } from '../type/Default';
import { writeRecurive } from './WriteRecurive';
export function Save ({
	data,
	name
}: Data) {
	if (typeof data == 'undefined') {
		throw new TypeError();
	}
	writeRecurive({
		data,
		path: {
			path: `./artifacts/${name}`,
			file: {
				name,
				ext: 'json'
			}
		}
	});

	writeRecurive({
		data,
		path: {
			path: `./artifacts/latest/${name}`,
			file: {
				name,
				ext: 'json'
			}
		}
	});
}
