import { postMessage } from '../../util/Slack';
import { read } from '../../util/type/File';
const caseTodayPath = 'plain/case/counter.slack.md';

const text = read({ path: caseTodayPath });
postMessage({ text });
