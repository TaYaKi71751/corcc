import React from 'react';
import ReactDOM from 'react-dom';
import { getPage } from './app/Page';
import reportWebVitals from './reportWebVitals';

const title: any = document.querySelector("title");
const href: any = document.location.href;
const params: any = href.split("?")[1];
const page = getPage({ params });

title.innerHTML = page.title;
ReactDOM.render(<React.StrictMode>
    {page.page}
</React.StrictMode>, document.body);

reportWebVitals();