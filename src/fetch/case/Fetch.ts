import { getUrl } from './URL';
import { request } from '@corcc/request';

export async function fetchCaseBy (
	lang: string
) {
	const options: any = getUrl(lang);
	const response = await request(options);
	return response.body;
}
