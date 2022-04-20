import { updateTweet } from '../../util/Tweet';
import fs from 'fs';
const path = [
	'plain',
	'vaccination',
	'counter',
	['today',
		'message',
		'txt'].join('.')
].join('/');

const text = fs.readFileSync(path).toString();
updateTweet({ text });
