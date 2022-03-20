import { updateTweet } from '../../util/Tweet';
import { read } from '../../util/type/File';
const vaccinationTodayPath = 'plain/vaccination/counter/today.message.txt';

const tweetText = read({ path: vaccinationTodayPath });
updateTweet({ text: tweetText });
