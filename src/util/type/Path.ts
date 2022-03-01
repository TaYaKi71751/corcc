import { execSync } from 'child_process';
import { tryCatch } from '../TryCatch';
import {
	fileToString,
	FileType
} from './File';
import __path__, { dirname } from 'path';
export const pwd = execSync('pwd | tr -d \'\\n\'').toString();

export type PathType = string | {
	path?: PathType;
	file?: FileType;
};

export function getFullPathAsString (p: PathType): string {
	return tryCatch({
		func: cdPath,
		params: p
	});
}

export function getPathExceptPwdAsString (p: PathType): string {
	return tryCatch({
		func: cdPath,
		params: __path__.resolve(pathToString(p))
	}).replace(pwd, '.');
}

export function cdPath (p: PathType): string {
	const pathString = __path__.resolve(pathToString(p));
	const command: string = `cd "${pathString}" && pwd | tr -d '\\n'`;
	return tryCatch({
		func: execSync,
		params: command
	}).toString();
}

export function lsPath (p: PathType): string {
	const pathOnlyString: string = tryCatch({
		func: getOnlyPathAsString,
		params: __path__.resolve(pathToString(p))
	});
	const command: string = `ls -R "${pathOnlyString}" && pwd | tr -d '\\n'`;
	return tryCatch({
		func: execSync,
		params: command
	}).toString();
}

export function mkdirPath (p: PathType): string {
	const pathOnlyString: string = tryCatch({
		func: pathToString,
		params: p
	});
	const command: string = `mkdir -p "${__path__.resolve(pathOnlyString)}"`;
	tryCatch({
		func: execSync,
		params: command
	});
	return tryCatch({
		func: cdPath,
		params: pathOnlyString
	});
}

export function getOnlyPathAsString (p: PathType): string {
	if (typeof p == 'string') {
		return tryCatch({
			func: cdPath,
			params: p,
			catchFunc: dirname,
			catchParams: p
		});
	}
	if (p?.path) {
		return `${pwd}/${p.path}/`;
	}
	throw new Error();
}

export function pathToString (p: PathType): string {
	if (typeof p == 'string') {
		return p;
	}
	if (p?.path && p?.file) {
		const pathString = p.path;
		const fileString = fileToString(p.file);
		return `${pwd}/${pathString}/${fileString}`;
	}
	if (!p?.file) {
		if (p?.path) {
			return `${pwd}/${p.path}`;
		}
	}
	throw new Error();
}

export function RecurivePath (path: PathType): PathType {
	return ((p: PathType): PathType => {
		const findPath = execSync(`cd "${(typeof p == 'string'
			? p
			: (p?.path ?? './'))}" && pwd | tr -d '\\n'`).toString();
		const { path, file }: any = p ?? {
			path: findPath
		};
		return file
			? {
				path: findPath,
				file
			}
			: path;
	})(path);
}
