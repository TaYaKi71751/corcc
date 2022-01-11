import {ClientRequest, ServerResponse} from 'http';
export async function request(options: ClientRequest & {
    body: string
}): Promise<any | ServerResponse> {
	const {protocol}:any = options;
	const http = require(protocol.replace(':', ''));
	return await new Promise((resolve, reject) => {
		let body = '';
		const req = http.request(options, (res: any) => {
			console.log(`PATH: ${options.path}`);
			console.log(`statusCode: ${res.statusCode}`);
			res.on('data', (d: any) => {
				body += d;
			});
			res.on('end', () => {
				res.body = body || undefined;
				resolve(res);
			});
		});
		if (options.body) {
			req.write(options.body);
		}
		req.on('error', (error: any) => {
			console.error(`URL: ${options.path}`);
			console.error(error);
			reject(error);
		});
		req.end();
	});
}
