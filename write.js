const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exit } = require('process');
function dirCheck(directory,fileName,fileExtension) {
  const dir = path.join(__dirname, directory);
  try{
    execSync(`ls -la ${dir}`).toString();
  }catch(e){
    console.error(e);
    try{
      execSync(`mkdir -p ${dir}`).toString();
    }catch(e){
      console.error(e);
      exit(-128);
    }
  }
  return path.join(`${dir}`,`${fileName ?? 'latest'}`)+(fileExtension?("."+fileExtension):'');
}
async function writeJson(data, directory, fileName) {
  fs.writeFileSync(path.resolve(dirCheck(directory,fileName,'json')), JSON.stringify(data, null, 2));
}
module.exports = { writeJson };