import { yester } from '../../../util/date/Day';
import { dateFormat } from '../../../util/date/Format';

export function dayDate ({
	tpcd,
	body
}: {
    tpcd: string,
    body: string
}): string {
	let { dataTime }: any = body;
	dataTime = Date.parse(dataTime);
	if (tpcd.includes('yes')) {
		return yester(dataTime);
	}
	return dateFormat(dataTime);
}
