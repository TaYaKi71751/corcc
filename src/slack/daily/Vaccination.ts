import {postMessage} from '../../util/Slack';
import {read} from '../../util/type/File';
const vaccinationTodayPath = 'plain/vaccination/counter/daily.slack.md';

const text = read({path: vaccinationTodayPath});
postMessage({
	text,
});
