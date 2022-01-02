import 'cheerio';
type Data = {
	data: JSON;
	name: string;
}

type Title = {
	title: string;
}

type Value = {
	value: bigint | number | string;
}

type DataTime = {
	data: string | object;
	time: Date | string;
}

type HTML = {
	html: any;
	selectors?: string | string[];
}

export {Data, HTML, DataTime, Title, Value};
