import { request } from '@corcc/request';

export async function fetchVaccinationBy (
	list:string
) {
	const options: any = {
		protocol: 'https:',
		hostname: 'nip.kdca.go.kr',
		path: `/irgd/cov19stats.do?list=${list}`,
		method: 'GET',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0',
			Connection: 'keep-alive'
		}
	};
	const response = await request(options);

	return response.body;
}
