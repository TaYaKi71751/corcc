import fs from 'fs';
import {execSync} from 'child_process';
const pwd = execSync('pwd').toString().replace('\n', '');

function readTweetText({path}: any) {
	return fs.readFileSync(`${pwd}/${path}`);
}

export {readTweetText};
