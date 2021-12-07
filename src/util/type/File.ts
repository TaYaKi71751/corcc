import { execSync } from 'child_process';
import { exit } from 'process';
type Path = string | {
  path?: Path;
  file?: File;
};
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

function Path(path?: Path): Path | any {
  try {
    return ((p?: Path): Path => {
      const pwd = execSync(`pwd | tr -d '\\n'`).toString();
      try{
        execSync(`cd "${(typeof p == 'string'?p:(p?.path??'./'))}" && pwd | tr -d '\\n'`).toString();
      }catch(e){
        try {
          execSync(`ls -la "${(typeof p == 'string'?p:(p?.path??'./'))}"`).toString();
        } catch (e) {
          console.error(new String(e));
          try {
            execSync(`mkdir -p "${(typeof p == 'string'?p:(p?.path??'./'))}"`).toString();
          } catch (e) {
            console.error(e);
            exit(-128);
          }
        }
      }
      const find_path = execSync(`cd "${(typeof p == 'string'?p:(p?.path??'./'))}" && pwd | tr -d '\\n'`).toString();
      const { path, file }: any = p ?? {
        path: find_path,
      };
      return file ? {
        path: find_path,
        file
      } : path;
    })(path);
  }
  catch (e) {
    console.error(e);
    return e;
  }
}

function File(file: File): File {
  return ((file: File): any => {
    return (typeof file == 'string' ? ((file: string) => {
      return {
        name: file.substring(0, file.lastIndexOf('.')),
        ext: file.substring(file.lastIndexOf('.') + 1, file.length)
      };
    })(file) : ((file: File) => {
      return file;
    })(file));
  })(file);
}

export { Path, File, Check, Save };

