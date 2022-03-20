import Twitter from 'twitter';
import TwitterText from 'twitter-text';
const client = new Twitter({
	consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
	consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
	access_token_key: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
	access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
});
export async function updateStatuses (
	{
		status,
		replyId
	}: {
		status?: string,
		replyId?: string
	}
) {
	return await new Promise((resolve, reject) => {
		client.post('statuses/update', {
			status,
			in_reply_to_status_id_str: replyId
		}, function (e: any, t: Twitter.ResponseData, r: any) {
			console.log(e || t);
			if (e) {
				reject(new Error(JSON.stringify(e)));
			}
			if (t) { resolve(t); }
		});
	});
}
export function splitText (text: string, split?: string) {
	const {
		valid,
		validRangeStart,
		validRangeEnd,
		displayRangeEnd
	} = TwitterText.parseTweet(text);
	return {
		valid,
		status: (
			valid
				? text
				: text.substring(
					validRangeStart,
					text.lastIndexOf(
						split ?? '\n',
						validRangeEnd + 1
					)
				)
		),
		remain: (
			valid
				? undefined
				: text.substring(
					validRangeEnd + 1,
					displayRangeEnd + 1
				)
		)
	};
}
export async function updateTweet ({
	text,
	replyId
}: {
	text: string;
	replyId?: string;
}) {
	const { status, remain } = splitText(text);
	let result: any;
	if (status) {
		result = await updateStatuses({
			status,
			replyId
		});
	}
	if (remain) {
		await updateTweet({
			text: remain ?? '',
			replyId: result.in_reply_to_status_id_str
		});
	}
}
