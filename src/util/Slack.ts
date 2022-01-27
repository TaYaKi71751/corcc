export function postMessage({
	text,
}: {
 text: string
}) {
	require('dotenv').config();
	const token = process.env.SLACK_TOKEN;
	const channel = process.env.SLACK_CHANNEL;
	const {WebClient} = require('@slack/web-api');

	const web = new WebClient(token);

	(async () => {
		const res = await web.chat.postMessage({
			channel,
			text,
		});
		console.log('Message sent: ', res.ts);
	})();
}
