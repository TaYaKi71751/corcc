import ReactDOM from 'react-dom';
import { getPage } from './app/Page';

const title: any = document.querySelector("title");
let href: any = document.location.href;
let params: any = href.split("?")[1];
const page = getPage({ params: params });

title.innerHTML = page.title;
ReactDOM.render(page.page, document.body);
// registerServiceWorker();