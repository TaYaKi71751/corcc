import { updateTweet } from '../../util/Tweet';
import { read } from '../../util/type/File';
const caseTodayPath = 'plain/case/counter.message.txt';

const tweetText = read({ path: caseTodayPath });
updateTweet({ text: tweetText });
