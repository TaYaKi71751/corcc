import { DataTime } from '../../type/Default';
import { parseXML } from '../../util/object/XML';
import { parseData } from './data/Parse';
import { insertTime } from './time/Insert';
import { parseTime } from './time/Parse';
export async function parse (xml: string) {
	console.log(
		'-----------------__XML_STRING_START__-----------------\n',
		xml, '\n',
		'------------------__XML_STRING_END__------------------\n'
	);
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
