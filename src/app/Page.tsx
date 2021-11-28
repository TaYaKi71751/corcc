import React from 'react';
import CovidPage from './covid/Page';

const pages:any = {
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
function getMatchedPage({
  params
}:any) {
  return Object.entries(pages).map(([k, v]) => {
    return params.includes(k) ? [k, v] : [k, null];
  }).filter(([, _]) => (_ != null))[0];
}
function getPage({
  params,
}: any) {
  if (!params) {
    return pages?.both;
  }
  const matchedPage = getMatchedPage({ params });
  const matchedPageValue = matchedPage[1];
  return matchedPageValue ?? pages?.both;
}

export { getPage };
