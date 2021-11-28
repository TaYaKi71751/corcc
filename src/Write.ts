import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { exit } from 'process';
function dirCheck(directory: string, fileName: string, fileExtension: string) {
  const dir = join(`${__dirname}/../`, directory);
  try {
    execSync(`ls -la ${dir}`).toString();
  } catch (e) {
    console.error(e);
    try {
      execSync(`mkdir -p ${dir}`).toString();
    } catch (e) {
      console.error(e);
      exit(-128);
    }
  }
  return join(`${dir}`, `${fileName ?? 'latest'}`) + (fileExtension ? ("." + fileExtension) : '');
}
function writeJson(data: any, directory: string, fileName?: any) {
  const writePath = resolve(dirCheck(directory, fileName, 'json'));
  const pwd = execSync('pwd').toString().replace("\n", "");
  const jsonString = JSON.stringify(data, null, 2);
  console.info(`Start write ${writePath.replace(pwd, ".")}`);
  try {
    writeFileSync(writePath, jsonString);
  } catch (e) {
    console.error(e);
    return undefined;
  }
  console.info(`Successfully writen ${writePath.replace(pwd, ".")}`);
}
export = writeJson;