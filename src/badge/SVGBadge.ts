import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import JSONBig from 'json-bigint';
import { Utilities } from '../util/Utilities';
import { emoji } from './Emoji';
import {
    pwd,
    cdPath,
    mkdirPath
} from '../util/type/Path';
const thousands = require('thousands');
import { tryCatch } from '../util/TryCatch'

const u = (() => {
    return new Utilities();
})();
type s = string;
type a<T> = Array<T>;
type n = number;
type b = boolean;
type f = Function;
function readCssFile({
    cssPath
}: any): string {
    const resolvePath = ((_p, d, p) => {
        return ((f: f, a: s) => {
            return f(a);
        })(_p.resolve, ((f: f, a: s, b: s) => {
            return f(a, b)
        })(_p.join, d, p));
    })(path, __dirname, cssPath);
    const cssPathArray: Array<string> = ((p: s): Array<s> => {
        const c: s = `find ${p} -name *.css -exec echo {} \\\;`;
        const r: s = ((c): s => {
            return execSync(c).toString();
        })(c);
        const a: Array<s> = ((a: Array<s>) => {
            return a.filter((_) => (_ != ''));
        })(r.split('\n'));
        return a;
    })(resolvePath);
    const cssArray: Array<string> = cssPathArray.map((p: s): s => {
        return fs.readFileSync(p, 'utf8').toString();
    });
    return cssArray.join('\n');
}

function getForeignObject({
    title,
    value
}: any) {
    const foreignObject = `<div xmlns="http://www.w3.org/1999/xhtml">
        <div class="${title} container">
            <div class="${title} title">
                ${title}
            </div>
            <div class="${title} value">
                ${value}
            </div>
        </div>
    </div>`;
    return foreignObject;
}
function getSvg({
    title,
    value
}: any) {
    const svg = `<svg viewBox="0 0 ${2 +
        16
        + 2 +
        (15 * value.length)
        + 2
        } 25" xmlns="http://www.w3.org/2000/svg">
	<style>
    ${readCssFile({
            cssPath: './res/css/'
        })}
	</style>
	<foreignObject width="100%" height="100%">
    ${getForeignObject({
            title,
            value
        })}
	</foreignObject>
    </svg>`;
    return svg;
}

const g = {
    s: getSvg
}

const saveBadges = (jsonPath: string) => {
    const read = ((f: f, p: s) => {
        return f(p).toString();
    })(fs.readFileSync, jsonPath);
    const json = JSONBig.parse(read);
    Object.entries(json).forEach(([k, v]) => {
        const P = (b: s, c: s) => {
            return ((a: s, c: n): s => {
                return a.substring(0, c);
            })(b, ((a: s, c: s): n => {
                return a.lastIndexOf(c);
            })(b, c));
        };
        const badge = (() => {
            const file = ((j: s): s => {
                return path.join(pwd, ((p: s, k: s) => {
                    const r = (o: s, a: s, b: s): s => {
                        return o.replace(a, b);
                    }
                    return ((p: s, k: s): s => {
                        return r(p, '.json', `/${k}.svg`);
                    })(((p: s): s => {
                        return r(p, 'latest', 'badge')
                    })(p), k);
                })(j, k));
            })(jsonPath);
            const e = ((e, n: s) => {
                return e[n];
            })(emoji, k);
            const svg = ((f, p) => {
                return f(p);
            })(g.s, {
                title: `${e}`,
                value: ((a: b, b: s, c: f) => {
                    return a ? c(b) : b;
                })(((a) => {
                    return u.isNumberOnly(a);
                })(`${v}`), `${v}`, thousands)
            })
            const directory = ((p: s) => {
                return P(p, '/')
            })(file);
            return {
                file, directory, svg
            };
        })();
        tryCatch({
            func: mkdirPath,
            params: badge.directory,
            catchFunc: (() => { }),
        })
        tryCatch({
            func: execSync,
            params: ((p: s) => {
                `echo '' > ${p}/.gitkeep`
            })(badge.directory),
            catchFunc: (() => { }),
        })
        fs.writeFileSync(badge.file, badge.svg);
    })
}

export { saveBadges }