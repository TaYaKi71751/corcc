import React, { Component } from 'react';
import CovidPage from './covid/Page'

const pages: any = {
  "both": {
    "title": "Vaccinations & Cases",
    "page": <CovidPage case="case" vaccination="vaccination" />
  },
  "vaccination": {
    "title": "Vaccinations",
    "page": <CovidPage vaccination="vaccination" />,
  },
  "case": {
    "title": "Cases",
    "page": <CovidPage case="case" />
  },
};
function getPageKeys() {
  return Object.keys(pages);
}
function getMatchedPageKey({
  params
}: any) {
  return Object.entries(pages).map(([k, v]) => {
    return params.includes(k) ? [k, v] : [k, null];
  }).filter(([, _]) => (_ != null))[0];
}
function getPage({
  params,
}: any) {
  console.log(params);
  let page: any = params ? (getMatchedPageKey({ params:params })[0] ?? "both"):"both";
  return pages[page];
}

export { getPage, getPageKeys };
