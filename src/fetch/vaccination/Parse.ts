import { DataTime } from '../../type/Default';
import { parseXML } from '../../util/object/XML';
import { parseData } from './data/Parse';
import { insertTime } from './time/Insert';
import { parseTime } from './time/Parse';
export async function parse (xml: string) {
	const { response }: any = await parseXML(xml);
	const { body }: any = response;
	const dataTime:DataTime = parseTime(body);
	let itemData:any = parseData(body);
	itemData = insertTime(
		dataTime,
		itemData
	);
	return itemData;
}
