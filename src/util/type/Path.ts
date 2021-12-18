import { execSync } from 'child_process';
import { tryCatch } from '../TryCatch';
import { fileToString } from './File';
import __path__ from 'path';
import {
    Check,
    File
} from './File';
const pwd = execSync(`pwd | tr -d '\\n'`).toString();

type Path = string | {
    path?: Path;
    file?: File;
};

function getFullPathAsString(p: Path): string {
    return tryCatch({
        func: cdPath,
        params: p
    })
}

function getPathWithFileNameExceptPwdAsString(p: Path): string {
    return pathToString(p).replace(pwd, '.');
}

function getPathExceptPwdAsString(p: Path): string {
    return tryCatch({
        func: cdPath,
        params: __path__.resolve(pathToString(p))
    }).replace(pwd, '.');
}

function cdPath(p: Path): string {
    const pathString = __path__.resolve(pathToString(p));
    const command: string = `cd "${pathString}" && pwd | tr -d '\\n'`;
    return tryCatch({
        func: execSync,
        params: command
    }).toString();
}


function lsPath(p: Path): string {
    const pathOnlyString: string = tryCatch({
        func: getOnlyPathAsString,
        params: __path__.resolve(pathToString(p))
    });
    const command: string = `ls -R "${pathOnlyString}" && pwd | tr -d '\\n'`;
    return tryCatch({
        func: execSync,
        params: command
    }).toString();
}

function mkdirPath(p: Path): string {
    const pathOnlyString: string = tryCatch({
        func: pathToString,
        params: p
    });
    const command: string = `mkdir -p "${__path__.resolve(pathOnlyString)}"`;
    tryCatch({
        func: execSync,
        params: command
    });
    return tryCatch({
        func: cdPath,
        params: pathOnlyString,
    });
}

function getOnlyPathAsString(p: Path): string {
    if (typeof p == 'string') {
        const pathBack = ((p: string): string => {
            return p.substring(0, p.lastIndexOf('/'));
        });
        return tryCatch({
            func: cdPath,
            params: p,
            catchFunc: pathBack,
            catchParams: p
        });
    }
    if (p?.path) {
        return `${pwd}/${p.path}/`;
    }
    throw new Error();
}

function pathToString(p: Path): string {
    if (typeof p == 'string') {
        return p;
    }
    if (p?.path && p?.file) {
        const pathString = p.path;
        const fileString = fileToString(p.file);
        return `${pwd}/${pathString}/${fileString}`;
    }
    if (!p?.file) {
        if (p?.path) {
            return `${pwd}/${p.path}`;
        }
    }
    throw new Error();
}



function RecurivePath(path: Path): Path {
    return ((p: Path): Path => {
        const find_path = execSync(`cd "${(typeof p == 'string' ? p : (p?.path ?? './'))}" && pwd | tr -d '\\n'`).toString();
        const { path, file }: any = p ?? {
            path: find_path,
        };
        return file ? {
            path: find_path,
            file
        } : path;
    })(path);

}

function Path(path?: Path): Path | any {
}


export { Path, cdPath, lsPath, mkdirPath, getOnlyPathAsString, RecurivePath, pathToString, getFullPathAsString, getPathExceptPwdAsString, pwd }