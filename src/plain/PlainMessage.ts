import { isNumberOnly } from '../util/string/Check';

import { exit } from 'process';
import fs from 'fs';
import { execSync } from 'child_process';
import { thousands } from '@taccl/thousands';
const pwd = execSync('pwd').toString().replace('\n', '');

const oe = Object.entries;
const ov = Object.values;
function prepare (path: string) {
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
	case: '🦠📅',
	vaccination: '💉📅',
	dataTime: '📅',
	confirmed: '🦠',
	deaths: '💀',
	recovered: '😊'
};

const getMessage: any = {
	twitter: function (k: any, v: any) {
		const key: string = `  ${emoji[k] ?? k.replace('Cnt', '')}`;
		const value = isNumberOnly(`${v}`) ? thousands(v) : v;
		return `${key} ${value}`;
	}
};

function plainTextMessage ({
	json,
	platform
}: any) {
	const data = oe(json).map(([k, v]: any) => getMessage[platform](k, v));
	return ov(data).join('\n');
}

function titleEmojiPrefix ({
	path
}: any) {
	const _ = (function (p) {
		if (p.includes('/case/')) {
			return 'case';
		}
		if (p.includes('/vaccination/')) {
			return 'vaccination';
		}
	})(path) ?? '_';
	const e = (emoji[_] ?? _.replace('Cnt', ''));
	return (e ? (e + '\n') : '');
}

export function toMarkdown (paths: string[]) {
	return paths.map((path) => {
		const read = execSync(`cat ${pwd}/${path}`).toString();
		const json = JSON.parse(read);
		const tableKeys = Object.keys(json);
		const tableValues = ov(json).map((a) => {
			return `${a}`;
		});
		const tableMarkdown = (
			`|${tableKeys.join('|')}|` + '\n' +
			`${(function (length) {
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
			'latest', 'plain'
		).replace(
			'.json', '.table.md'
		);
		prepare(tableMarkdownPath);
		fs.writeFileSync(`${pwd}/${tableMarkdownPath}`, tableMarkdown);
		const messageText = titleEmojiPrefix({ path }) + plainTextMessage({
			json, platform: 'twitter'
		});
		console.log(messageText);
		const messageTextPath = path.replace(
			'latest', 'plain'
		).replace(
			'.json', '.message.txt'
		);
		prepare(messageTextPath);
		fs.writeFileSync(`${pwd}/${messageTextPath}`, messageText);
		return [tableMarkdown, messageText];
	});
};
