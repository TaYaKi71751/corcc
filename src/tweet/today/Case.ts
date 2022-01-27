import {updateTweet} from '../../util/Tweet';
import {read} from '../../util/type/File';
const caseTodayPath = 'plain/case/counter.tweet.txt';

const tweetText = read({path: caseTodayPath});
updateTweet({status: tweetText});
