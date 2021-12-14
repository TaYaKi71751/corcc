import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { exit } from 'process';
import { Path, File, Check, Save } from './type/File';

function dirCheck({
  path,
  file
}: Check | any): string {
  var dir = join(Path(), path);
  dir = dir.includes('latest/') ? dir.substring(0, dir.lastIndexOf('/')) : dir;
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
  return join(dir, `${(name) ?? 'latest'}`) + (ext ? ("." + ext) : '');
}
var dataTime: any = '';

function checkPath({
  writePath
}: any) {
  return (function (p: string) {
    const a = p.substring(p.lastIndexOf('/', p.lastIndexOf('/') - 1) + 1, p.lastIndexOf('/'));
    const b = p.substring(p.lastIndexOf('/') + 1, p.lastIndexOf('.'));
    const c = a == b;
    const d = function (e: string) {
      return e.replace(`/${a}.`, '.')
    };
    console.log(a, b);
    return c ? d(p) : p;
  })(writePath)
}

function write({
  writePath,
  jsonString,
  pwd
}: any) {
  const _writePath = checkPath({ writePath });
  console.info(`Start write ${_writePath.replace(pwd, ".")}`);
  try {
    writeFileSync(_writePath, jsonString);
  } catch (e) {
    console.error(e);
    return;
  }
  console.info(`Successfully writen ${_writePath.replace(pwd, ".")}`);
  return true;
}

function stringify(d: any): string {
  return JSON.stringify(d, null, 2);
}

const _rootDir_ = Path();
function writeFile({
  data,
  path
}: Save) {
  const writePath = resolve(dirCheck(path));
  const pwd = execSync('pwd').toString().replace("\n", "");
  const jsonString = stringify(data);
  write({
    writePath,
    jsonString,
    pwd
  })
  Object.entries(data).forEach(([k, v]) => {
    dataTime = k.includes("yes") ? dataTime : ((data: any) => {
      return typeof data == 'string' ? dataTime : data?.dataTime ?? dataTime;
    })(v);
    if (typeof v == 'string') {
      if (!v.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
        return;
      }
    }
    const __path__ = (Path(path)?.path).replace(_rootDir_, ".");
    writeFile({
      data: v,
      path: {
        path: `${__path__}/${k}`,
        file: {
          name: k,
          ext: 'json'
        }
      }
    })
    if (!__path__.includes("latest/")) {
      write({
        writePath: `${__path__}/${k}/latest.json`,
        jsonString: stringify(v),
        pwd
      })
      write({
        writePath: `${__path__}/${k}/${dataTime}.json`,
        jsonString: stringify(v),
        pwd
      })
    }
  })
}
export { writeFile };