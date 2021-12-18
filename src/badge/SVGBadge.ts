import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function readCssFile({
    cssPath
}: any): string {
    const __path__ = path.resolve(path.join(__dirname,cssPath));
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
export { getSvg }