import {updateTweet} from '../util/Tweet';
import {readTweetText} from '../util/Read';
const caseTodayPath = 'plain/case/counter.tweet.txt';

const tweetText = readTweetText({path: caseTodayPath});
updateTweet({status: tweetText});
