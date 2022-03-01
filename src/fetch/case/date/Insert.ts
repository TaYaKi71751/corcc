import { DataTime } from '../../../type/Default';

export function inserTime ({ data, time }: DataTime): any {
	const _: string = JSON.stringify(data);
	const _r: string = _.replace('{', `{"dataTime":"${time}",`);
	const _j: JSON = JSON.parse(_r);
	return _j;
}
