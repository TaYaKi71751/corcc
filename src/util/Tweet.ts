import Twitter from 'twitter';
const client = new Twitter({
	consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
	consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
	access_token_key: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
	access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
});
const MAX_TWEET_TEXT_BYTES = 140;
export async function updateTweet ({
	status,
	replyId
}: {
	status: string;
	replyId?: string;
}) {
	try {
		const m = !(status.length < MAX_TWEET_TEXT_BYTES);
		const n = status.lastIndexOf('\n', MAX_TWEET_TEXT_BYTES);
		if (m && (n < 0)) {
			throw Error('Need \\n to split Tweet');
		}
		const s = m ? status.substring(0, n) : status;
		const o:any = {
			status: s
		};
		if (replyId) {
			o.in_reply_to_status_id_str = replyId;
		}
		console.log(o);
		const result:any = await client.post('statuses/update', o);
		if (m) {
			const o = status.substring(n, status.length);
			const tweetIdStr = result.id_str;
			console.log(o);
			await updateTweet({
				status: o,
				replyId: tweetIdStr
			});
		}
	} catch (e:any) {
		console.error(e);
		throw e;
	}
}
