import fs from 'fs';
import { dirname, join } from 'path';

export function write ({
	data,
	path,
	ext
}: {
	data:Buffer
	path:string[]
	ext:string[]
}) {
	ext.forEach((ext:string) => {
		const outPath = join(
			process.cwd(),
			[path.filter((p) => (p)).join('/'),
				ext].filter((e) => (e)).join('.')
		);
		const dirPath = dirname(outPath);
		if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }
		try {
			console.info(`Start write ${outPath}`);
			fs.writeFileSync(outPath, data);
		} catch (e) {
			console.info(`Error while writing ${outPath} :`);
			console.error(e);
			return;
		}
		console.info(`Successfully writen ${outPath}`);
	});
}
