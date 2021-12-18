import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import JSONBig from 'json-bigint';
import { Utilities } from '../util/Utilities';
import { emoji } from './Emoji';
import __path__ from 'path';
import {
    pwd,
    cdPath,
    mkdirPath
} from '../util/type/Path';
const thousands = require('thousands');
import { tryCatch } from '../util/TryCatch'

const util = new Utilities();

function readCssFile({
    cssPath
}: any): string {
    const __path__ = path.resolve(path.join(__dirname, cssPath));
    return fs.readFileSync(`${__path__}`).toString();
}

function getForeignObject({
    title,
    value
}: any) {
    const foreignObject = `<div xmlns="http://www.w3.org/1999/xhtml">
        <div class="container">
            <div class="${title}">
                ${title}
            </div>
            <div class="${title}">
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
    const svg = `<svg viewBox="0 0 120 25" xmlns="http://www.w3.org/2000/svg">
	<style>
    ${readCssFile({
        cssPath: './res/css/style.css'
    })}
	</style>
	<svg viewBox="0 0" height="27" />
	<foreignObject width="100%" height="27">
    ${getForeignObject({
        title,
        value
    })}
	</foreignObject>
    </svg>`;
    return svg;
}

const saveBadges = (path: any) => {
    const read = fs.readFileSync(path).toString();
    const json = JSONBig.parse(read);
    Object.entries(json).forEach(([k, v]) => {
        const badgeSavePath = __path__.join(pwd, (path.replace('latest', 'badge').replace('.json', `/${k}.svg`)));
        const titleEmoji = emoji[k];
        const svgBadge = getSvg({
            title: `${titleEmoji}`,
            value: util.isNumberOnly(`${v}`) ? thousands(v) : v
        });
        tryCatch({
            func: mkdirPath,
            params: badgeSavePath.substring(0, badgeSavePath.lastIndexOf('/')),
            catchFunc: (() => { }),
        })
        tryCatch({
            func: execSync,
            params: `echo '' > ${badgeSavePath.substring(0, badgeSavePath.lastIndexOf('/'))}/.gitkeep`,
            catchFunc: (() => { }),
        })
        fs.writeFileSync(badgeSavePath, svgBadge);
    })
}

export { saveBadges }