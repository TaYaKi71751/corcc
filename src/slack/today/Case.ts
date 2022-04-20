import { postMessage } from '../../util/Slack';
import fs from 'fs';
const path = [
	'plain',
	'case',
	['counter',
		'message',
		'txt'].join('.')
].join('/');

const text = fs.readFileSync(path).toString();
postMessage({ text });
