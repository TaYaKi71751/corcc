import { _$ } from './Load';
import { HTML } from '../../type/Default';
import * as cheerio from 'cheerio';

export function parse ({ html }: HTML): cheerio.Root {
	return _$((_$(html) ?? html).html());
}
