import { DataTime } from '../../../type/Default';

export function inserTime ({ data, time }: DataTime): any {
	return Object.assign(
		{ dataTime: time },
		data
	);
}
