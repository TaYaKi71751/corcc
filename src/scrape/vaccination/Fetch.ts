import {request} from '../../util/http/Request';


export async function fetchVaccination({
	list,
}: {
	list: string
}) {
	const options: any = {
		protocol: 'https:',
		host: 'nip.kdca.go.kr',
		path: `/irgd/cov19stats.do?list=${list}`,
		method: 'GET',
		headers: {
			// eslint-disable-next-line max-len
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0',
			'Connection': 'keep-alive',
		},
	};
	const response = await request(options);

	return response.body;
}
