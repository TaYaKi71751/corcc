import {isNumberOnly} from '../util/string/Check';

const {exit} = require('process');
const fs = require('fs');
const {execSync} = require('child_process');
const thousands = require('thousands');
const pwd = execSync('pwd').toString().replace('\n', '');

const oe = Object.entries;
const ov = Object.values;
function prepare(path: string) {
	try {
		execSync(`ls ${pwd}/${path.substring(0, path.lastIndexOf('/'))
		}`).toString();
	} catch (e: any) {
		console.error(e.message);
		try {
			execSync(`mkdir -p ${pwd}/${path.substring(0, path.lastIndexOf('/'))
			}`).toString();
		} catch (e) {
			exit(0xDD);
		}
	} finally {
		try {
			execSync(`ls ${pwd}/${path.substring(0, path.lastIndexOf('/'))
			}/.gitkeep`).toString();
		} catch (e: any) {
			console.error(e.message);
			try {
				execSync(`echo ''> ${pwd}/${path.substring(0, path.lastIndexOf('/'))
				}/.gitkeep`);
			} catch (e) {
				exit(0xDF);
			}
		}
	}
}

const emoji: any = {
	'case': '🦠📅',
	'vaccination': '💉📅',
	'firstCnt': '☝️',
	'secondCnt': '✌️',
	'thirdCnt': '🤟',
	'fourthCnt': '🖖',
	'dataTime': '📅',
	'confirmed': '🦠',
	'deaths': '💀',
	'recovered': '😊',
};

const getMessage: any = {
	'slack': function(k: any, v: any) {
		const key: string = `*${emoji[k]}*`;
		const value = isNumberOnly(`${v}`) ? thousands(v) : v;
		return `${key} ${value}`;
	},
	'twitter': function(k: any, v: any) {
		const key: string = `  ${emoji[k]}`;
		const value = isNumberOnly(`${v}`) ? thousands(v) : v;
		return `${key} ${value}`;
	},
};

function plainTextMessage({
	json,
	platform,
}: any) {
	const data = oe(json).map(([k, v]: any) => getMessage[platform](k, v));
	return ov(data).join('\n');
}

function titleEmojiPrefix({
	path,
}: any) {
	const _ = (function(p) {
		if (p.includes('/case/')) {
			return 'case';
		}
		if (p.includes('/vaccination/')) {
			return 'vaccination';
		}
		return;
	})(path) ?? '_';
	return (emoji[_] ?? '') + (emoji[_] ? '\n' : '');
}


const toMarkdown = function(paths: string[]) {
	return paths.map((path) => {
		const read = execSync(`cat ${pwd}/${path}`).toString();
		const json = JSON.parse(read);
		const tableKeys = Object.keys(json);
		const tableValues = ov(json).map((a) => {
			return `${a}`;
		});
		const tableMarkdown = (
			`|${tableKeys.join('|')}|` + '\n' +
			`${(function(length) {
				let r = '';
				for (let i = 0; i < length; i++) {
					r += r ? '-|' : '|-|';
				}
				return r;
			})(tableKeys.length)}` + '\n' +
			`|${tableValues.join('|')}|`
		);
		console.log(tableMarkdown);
		const tableMarkdownPath = path.replace(
			'latest', 'plain',
		).replace(
			'.json', '.table.md',
		);
		prepare(tableMarkdownPath);
		fs.writeFileSync(`${pwd}/${tableMarkdownPath}`, tableMarkdown);
		const slackMarkdown = titleEmojiPrefix({
			path,
		}) + plainTextMessage({
			json, platform: 'slack',
		});
		console.log(slackMarkdown);
		const slackMarkdownPath = path.replace(
			'latest', 'plain',
		).replace(
			'.json', '.slack.md',
		);
		prepare(slackMarkdownPath);
		fs.writeFileSync(`${pwd}/${slackMarkdownPath}`, slackMarkdown);
		const tweetText = titleEmojiPrefix({path}) + plainTextMessage({
			json, platform: 'twitter',
		});
		console.log(tweetText);
		const tweetTextPath = path.replace(
			'latest', 'plain',
		).replace(
			'.json', '.tweet.txt',
		);
		prepare(tweetTextPath);
		fs.writeFileSync(`${pwd}/${tweetTextPath}`, tweetText);
		return [tableMarkdown, slackMarkdown, tweetText];
	});
};
export {toMarkdown};
