import { isNumberOnly } from './string/Check';
import { write } from './Write';

let dataTime: any = '';

function stringify (d: any): string {
	return JSON.stringify(d, null, '\t');
}

export function writeRecurive ({
	data,
	path
}: {
	data:{[x:string]:any}
	path:string[]
}) {
	dataTime = dataTime || data?.dataTime;
	if (!dataTime) {
		Object.entries(data)
			.forEach(([k, v]) => {
				Object.entries(v)
					.filter(([k]) => (k.includes('dataTime')))
					.filter(([k, v]:[k:string, v:string|any]) => (
						v.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
							.length
					))
					.forEach(([k, v]) => {
						dataTime = v;
					});
			});
	}
	data = typeof data == 'object'
		? Object.assign(
			{ dataTime: data?.dataTime || dataTime },
			data
		)
		: data;
	write({
		path: path,
		ext: ['json'],
		data: Buffer.from(stringify(data))
	});
	Object.entries(
		data
	).forEach(([k, v]: any) => {
		if (typeof v == 'string') {
			if (isNumberOnly(k)) {
				return;
			}
		}
		writeRecurive({
			path: [...path, k],
			data: v
		});
		const postfix = [];
		if (!path.includes('latest')) {
			postfix.push('latest');
			postfix.push(dataTime);
		}
		postfix.forEach((postfix:string) => write({
			path: [...path, k, postfix].filter((p) => (p)),
			ext: ['json'],
			data: Buffer.from(stringify(v), 'utf-8')
		}));
	});
}
