export function postMessage ({
	text
}: {
	text: string
}) {
	const token = process.env.SLACK_TOKEN;
	const channel = process.env.SLACK_CHANNEL;
	const { WebClient } = require('@slack/web-api');

	const web = new WebClient(token);

	web.chat.postMessage({
		channel,
		text
	}).then((res: any) => {
		console.log(res);
	});
}
