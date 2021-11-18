const { exit } = require('process');
const { writeJson } = require('./write');
const _types = {
  "getVaccinationGiven": {          //
    "counter": {
      "list": "all",
      "tpcd": {
        'A': { 'today': "" },               //Today         TZ=>KST
        'B': { 'yesterday_c': '' },   //Yesterday's Cumulative
        'C': { 'today_c': '' },       //Today's Cumulative
      }, "_tags": {
        "dataTime": "",
        "firstCnt": "",
        "secondCnt": "",
        "thirdCnt": "",
      },
    }, "country": {
      "list": "sido",
      "_tags": {
        "firstCnt": "",
        "firstTot": "",
        "secondCnt": "",
        "secondTot": "",
        "thirdCnt": "",
        "thirdTot": "",
      },
    },
  },
};
async function scrap({
  fnNm,
  path,
  type
}) {
  (async function () {
    var _function = await require('./GET')[fnNm]();
    return _function;
  })()
    .then((_function) => (_function(type)))
    .catch((error) => {
      console.error(error);
      exit(-1);
    })
    .then((data) => {
      if (Object.values(data).filter((_) => (typeof _ == 'string')).length > 1) {
        writeJson(data, `vaccination`);
      }
      writeJson(data, `vaccination`, path)
      writeJson(data, `vaccination/${path}`);
      writeJson(data, `vaccination/${path}`, data['dataTime']);
    });
}

Object.entries(_types).forEach(([fnNm, v]) => {
  Object.entries(v).forEach(([k, v]) => {
    scrap({
      fnNm:fnNm,
      path:k,
      type:v});
  });
})