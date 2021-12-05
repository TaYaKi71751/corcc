import 'cheerio';
type Data = {
  data: JSON;
  name: string;
}

type DataTime = {
  data: string | object;
  time: Date | string;
}

type HTML = {
  html: any;
  selectors?: string | string[];
}

export { Data, HTML,DataTime }