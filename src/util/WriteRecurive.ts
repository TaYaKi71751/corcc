import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { exit } from 'process';
import { tryCatch } from './TryCatch';
import {
  Write
} from './Write';
import {
  pathToString,
  getFullPathAsString,
  cdPath,
  lsPath,
  mkdirPath,
  pwd,
  getOnlyPathAsString,
  getPathExceptPwdAsString
} from './type/Path';
import { RecurivePath } from './type/Path';
import { File, Check, Save } from './type/File';
import __path__ from 'path';

function prepare({
  path,
  file
}: Check | any): string {
  var dir: string = tryCatch({
    func: pathToString,
    params: {
      path,
      file,
    }
  });
  let validWritePath: string = tryCatch({
    func: getValidWritePath,
    params: {
      writePath: dir
    }
  });
  validWritePath = __path__.resolve(validWritePath);
  const validPath = tryCatch({
    func:getOnlyPathAsString,
    params:validWritePath,
  });

  tryCatch({
    func: mkdirPath,
    params: validPath,
    catchFunc:execSync,
    catchParams:`echo ''> ${validPath}/.gitkeep`
  });
  // dir = validPath.includes('latest/') ? validPath.substring(0, validPath.lastIndexOf('/')) : validPath;
  return validWritePath;
}
var dataTime: any = '';

function getValidWritePath({
  writePath
}: any) {
  return (function (p: string) {
    const _ = function (a:number,b:number,c:number){
      if(a==-1){
        return b;
      }
      return c;
    }
    const a = p.lastIndexOf('/');
    const b = p.lastIndexOf('.');
    const c = p.lastIndexOf('/', a - 1);
    const d = p.lastIndexOf('/', c - 1);
    if(b==-1){
      return __path__.resolve(p);
    }
    const g = p.substring((_(b,c,a) + 1), _(b,a,b));
    const h = p.substring(_(b,d,c) + 1, _(b,c,a));
    const i = g == h;
    const j = function (e: string) {
      return e.replace(`/${g}.`, '.')
    };
    console.log(g, h);
    return i ? __path__.resolve(j(__path__.resolve(p))) : __path__.resolve(p);
  })(writePath)
}

function write({
  writePath,
  jsonString,
  pwd
}: any) {
  const validPath = getValidWritePath({ writePath });
  Write({
    data: jsonString,
    path: validPath,
  })
  return true;
}

function stringify(d: any): string {
  return JSON.stringify(d, null, 2);
}

function writeRecurive({
  data,
  path
}: Save) {
  const writePath = resolve(prepare(path));
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
    const pathOnlyString: string = tryCatch({
      func: getOnlyPathAsString,
      params: path
    });
    const pathOnlyExceptPwd: string = __path__.resolve(pathOnlyString).replace(pwd,'.');
    writeRecurive({
      data: v,
      path: {
        path: `${pathOnlyExceptPwd}/${k}`,
        file: {
          name: k,
          ext: 'json'
        }
      }
    })
    if (!pathOnlyExceptPwd.includes("latest/")) {
      write({
        writePath: `${pathOnlyExceptPwd}/${k}/latest.json`,
        jsonString: stringify(v),
        pwd
      })
      write({
        writePath: `${pathOnlyExceptPwd}/${k}/${dataTime}.json`,
        jsonString: stringify(v),
        pwd
      })
    }
  })
}
export { writeRecurive };