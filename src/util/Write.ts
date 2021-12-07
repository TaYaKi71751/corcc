import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { exit } from 'process';
import { Path, File, Check, Save } from './type/File';
function dirCheck({
  path,
  file
}: Check | any): string {
  const dir = join(Path(), path);
  try {
    execSync(`ls -la ${dir}`).toString();
  } catch (e) {
    console.error(new String(e));
    try {
      execSync(`mkdir -p ${dir}`).toString();
    } catch (e) {
      console.error(e);
      exit(-128);
    }
  } finally {
    execSync(`echo '' > ${dir}/.gitkeep`).toString();
  }
  const { name, ext }: any | File = File(file);
  return join(`${dir}`, `${(name) ?? 'latest'}`) + (ext ? ("." + ext) : '');
}
var dataTime: any = '';

const _rootDir_ = Path();
function writeFile({
  data,
  path
}: Save) {
  const writePath = resolve(dirCheck(path));
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
  Object.entries(data).forEach(([k, v]) => {
    dataTime = k.includes("yes") ? dataTime : ((data: any) => {
      return typeof data == 'string' ? dataTime : data?.dataTime ?? dataTime;
    })(v);
    if (typeof v == 'string') {
      if(!v.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)){
        return;
      }
    }
    const __path__ = Path(path).path.replace(_rootDir_, "./");
    console.log(__path__);
    console.log(dataTime);
    console.log(k);
    writeFile({
      data: v,
      path: {
        path: `${__path__}/${k}`,
        file: {
          name: dataTime,
          ext: 'json'
        }
      }
    })
    writeFile({
      data: v,
      path: {
        path: `${__path__}/${k}`,
        file: {
          name: 'latest',
          ext: 'json'
        }
      }
    })
  })
}
export { writeFile };