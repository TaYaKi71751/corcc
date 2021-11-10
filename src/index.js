import React from 'react';
import ReactDOM from 'react-dom';
import Page from './app/covid/Page';

// import registerServiceWorker from './registerServiceWorker';
if(document.location.href.includes("case")){
  ReactDOM.render(<Page case="case" />, document.body);
}else 
if(document.location.href.includes("vaccination")){
  ReactDOM.render(<Page vaccination="vaccination" />, document.body);
}else {
  ReactDOM.render(<Page case="case" vaccination="vaccination" />, document.body);
}

// registerServiceWorker();