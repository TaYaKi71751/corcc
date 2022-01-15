import {getUrl} from './URL';
import {request} from '@corcc/request';

export async function fetchCase({
	lang,
}: {
	lang: string
}) {
	const options: any = await getUrl({lang});
	const response = await request(options);
	return response.body;
}
