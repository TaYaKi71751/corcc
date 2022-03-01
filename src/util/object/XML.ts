import xml2js from 'xml2js';

const parser = new xml2js.Parser({ attrkey: 'ATTR', explicitArray: false });

export async function parseXML (xml: string) {
	return new Promise((resolve, reject) => {
		parser.parseString(xml, function (error: any, result: any) {
			if (error === null) {
				resolve(result);
			} else {
				reject(error);
			}
		});
	});
}
