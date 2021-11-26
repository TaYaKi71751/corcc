import ReactDOM from 'react-dom';
import { getPage } from './app/Page';

const title: any = document.querySelector("title");
let href: any = document.location.href;
let params: any = href.includes("?") ? (href.split("?")[href.split("?").length - 1]) : undefined;
const page = getPage({ page: undefined, params: params });

title.innerHTML = page.title;
ReactDOM.render(page.page, document.body);
// registerServiceWorker();