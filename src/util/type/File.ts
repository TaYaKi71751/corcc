import { PathType } from './Path';
import { dirname, basename, extname } from 'path';
export type FileType = string | {
	name: string;
	ext?: string;
};
export type CheckType = {
	path?: PathType;
	file?: File;
};
export type SaveType = {
	data?: any | string | JSON;
	path?: PathType;
}

export function fileToString (file: FileType): string {
	switch (typeof file) {
	case 'string': return file;
	case 'object': return (function () {
		if (!file.ext) {
			return `${file.name}`;
		}
		return `${file.name}.${file.ext}`;
	})();
	}
}

export function File (file: FileType) {
	switch (typeof file) {
	case 'string': return {
		name: [
			dirname(file),
			basename(file, extname(file))
		].join('/'),
		ext: extname(file).replace('.', '')
	};
	case 'object': return file;
	default: throw file;
	}
}

export function read ({ path }: any) {
	return require('fs').readFileSync(`${process.cwd()}/${path}`).toString();
}
