const Twitter = require('twitter');
require('dotenv').config();
const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
function updateTweet({
	status,
}: any) {
	client.post('statuses/update',
		{status},
		function(error: any, tweet: any, response: any) {
			if (!error) {
				console.log(tweet);
			}
		});
}
export {updateTweet};
