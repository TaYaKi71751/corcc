import __path__, { basename, dirname, extname, resolve } from 'path';
import { execSync } from 'child_process';
import { tryCatch } from './TryCatch';
import {
	Write
} from './Write';
import {
	pathToString,
	mkdirPath,
	pwd,
	getOnlyPathAsString
} from './type/Path';
import { CheckType, SaveType } from './type/File';
import { sortObject } from './object/Sort';
import { isNumberOnly } from './string/Check';

function prepare ({
	path,
	file
}: CheckType | any): string {
	const p: string = tryCatch({
		func: pathToString,
		params: {
			path,
			file
		}
	});
	let validWritePath: string = tryCatch({
		func: getValidWritePath,
		params: {
			writePath: p
		}
	});
	validWritePath = __path__.resolve(validWritePath);
	const validPath = tryCatch({
		func: getOnlyPathAsString,
		params: validWritePath
	});

	tryCatch({
		func: mkdirPath,
		params: validPath,
		catchFunc: execSync,
		catchParams: `echo ''> ${validPath}/.gitkeep`
	});
	return validWritePath;
}
let dataTime: any = '';

function getValidWritePath ({
	writePath
}: any) {
	return (function (p: string) {
		const _ = function (a: number, b: number, c: number) {
			if (a == -1) {
				return b;
			}
			return c;
		};
		const a = p.lastIndexOf('/');
		const b = p.lastIndexOf('.');
		const c = p.lastIndexOf('/', a - 1);
		const d = p.lastIndexOf('/', c - 1);
		if (b == -1) {
			return __path__.resolve(p);
		}
		const g = p.substring((_(b, c, a) + 1), _(b, a, b));
		const h = p.substring(_(b, d, c) + 1, _(b, c, a));
		const i = g == h;
		const j = function (e: string) {
			return e.replace(`/${g}.`, '.');
		};
		console.log(g, h);
		return i ? __path__.resolve(j(__path__.resolve(p))) : __path__.resolve(p);
	})(writePath);
}

function write ({
	writePath,
	jsonString,
	pwd
}: any) {
	const validPath = getValidWritePath({ writePath });
	// eslint-disable-next-line new-cap
	Write({
		data: jsonString,
		path: validPath
	});
	return true;
}

function stringify (d: any): string {
	return JSON.stringify(d, null, '\t');
}

export function writeRecurive ({
	data,
	path
}: SaveType) {
	const writePath = resolve(prepare(path));
	const _data = (function (_d: any) {
		if (
			typeof _d != typeof {}
		) {
			return _d;
		}
		let _dat = _d;
		const pathSplit = writePath.split('/');
		const dirOnly = pathSplit.filter((_) => (!_.includes('.json')));
		if (
			pathSplit.indexOf('latest') > -1 &&
			dirOnly.indexOf('country') > -1 &&
			!_dat.dataTime
		) {
			_dat = sortObject(_dat);
			_dat = stringify(_dat).replace('{', `{"dataTime":"${dataTime}",`);
			_dat = JSON.parse(_dat);
		}
		return _dat;
	})(data);
	const jsonString = stringify(_data);
	write({
		writePath,
		jsonString,
		pwd
	});
	Object.entries(_data).forEach(([k, v]: any) => {
		dataTime = k.includes('yes')
			? dataTime
			: (function (d: any) {
				return (
					d?.dataTime
						?.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
						.length
						? d.dataTime
						: dataTime);
			})(v);
		if (typeof v == 'string') {
			if (isNumberOnly(k)) {
				return;
			}
		}
		const pathOnlyString: string = tryCatch({
			func: getOnlyPathAsString,
			params: path
		});
		const pathOnlyExceptPwd: string = (function ({
			r, p
		}: {
			r: Function,
			p: string
		}): string {
			return r(p).replace(pwd, '.');
		})({
			r: __path__.resolve,
			p: pathOnlyString
		});
		writeRecurive({
			data: v,
			path: {
				path: `${pathOnlyExceptPwd}/${k}`,
				file: {
					name: k,
					ext: 'json'
				}
			}
		});
		if (!pathOnlyExceptPwd.includes('latest/')) {
			write({
				writePath: `${pathOnlyExceptPwd}/${k}/latest.json`,
				jsonString: stringify(v),
				pwd
			});
			write({
				writePath: `${pathOnlyExceptPwd}/${k}/${dataTime}.json`,
				jsonString: stringify(v),
				pwd
			});
		}
	});
}
