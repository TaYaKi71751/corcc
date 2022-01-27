import {Path} from './Path';
type File = string | {
	name: string;
	ext: string;
};
type Check = {
	path?: Path;
	file?: File;
};
type Save = {
	data?: any | string | JSON;
	path?: Path;
}

function fileToString(file: File): string {
	if (typeof file == 'string') {
		return file;
	}
	if (typeof file.ext == 'undefined' || file.ext == '' || file.ext == null) {
		return `${file.name}`;
	}
	return `${file.name}.${file.ext}`;
}

function File(file: File): File {
	return ((file: File): any => {
		return (typeof file == 'string' ? ((file: string) => {
			return {
				name: file.substring(0, file.lastIndexOf('.')),
				ext: file.substring(file.lastIndexOf('.') + 1, file.length),
			};
		})(file) : ((file: File) => {
			return file;
		})(file));
	})(file);
}

export function read({path}: any) {
	return require('fs').readFileSync(`${process.cwd()}/${path}`).toString();
}

export {File, fileToString};
export type {Check, Save};

