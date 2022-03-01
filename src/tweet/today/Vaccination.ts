import { updateTweet } from '../../util/Tweet';
import { read } from '../../util/type/File';
const vaccinationTodayPath = 'plain/vaccination/counter/today.tweet.txt';

const tweetText = read({ path: vaccinationTodayPath });
updateTweet({ status: tweetText });
