import {
	pwd,
	PathType,
	pathToString
} from './type/Path';
import fs from 'fs';
export function Write ({
	data,
	path
}: {
	data:any;
	path:PathType;
}) {
	const fullPathString: string = pathToString(path);
	const pwdExceptedPathString = fullPathString.replace(pwd, '.');
	try {
		console.info(`Start write ${pwdExceptedPathString}`);
		fs.writeFileSync(fullPathString, data);
	} catch (e) {
		console.info(`Error while writing ${pwdExceptedPathString} :`);
		console.error(e);
		return;
	}
	console.info(`Successfully writen ${pwdExceptedPathString}`);
	return true;
}
