const { writeFileSync } = require('fs');
const { resolve, join } = require('path');
const { execSync } = require('child_process');
const { exit } = require('process');
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
  writeFileSync(resolve(dirCheck(directory, fileName, 'json')), JSON.stringify(data, null, 2));
}
export = writeJson;