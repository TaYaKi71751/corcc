import { postMessage } from '../../util/Slack';
import fs from 'fs';
const path = [
	'plain',
	'vaccination',
	'counter',
	['daily',
		'message',
		'txt'].join('.')
].join('/');
const text = fs.readFileSync(path).toString();
postMessage({
	text
});
