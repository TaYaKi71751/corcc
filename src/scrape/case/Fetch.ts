import {getUrl} from './URL';
import {request} from '../../util/http/Request';

export async function fetchCase({
	lang,
}: {
    lang: string
}) {
	const options: any = await getUrl({lang});
	const response = await request(options);
	return response.body;
}
