import {updateTweet} from '../util/Tweet';
import {readTweetText} from '../util/Read';
const vaccinationTodayPath = 'plain/vaccination/counter/today.tweet.txt';

const tweetText = readTweetText({path: vaccinationTodayPath});
updateTweet({status: tweetText});
