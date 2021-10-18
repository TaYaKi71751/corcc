const fs = require('fs');
const path = require('path');
const _types = {
  "simple": {
    "path": "simple",
    "list": "all",
    "tpcd": {
      'A': { 'today': ""},               //Today         TZ=>KST
      'B': { 'yesterday_c':'' },   //Yesterday's Cumulative
      'C': { 'today_c': '' },       //Today's Cumulative
    }, "_tags": {
      "dataTime": "",
      "firstCnt": "",
      "secondCnt": "",
      "thirdCnt": "",
    },
  }, "regions": {
    "path": "regions",
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
};
async function writeJson(data, dataDir, fileName) {
  fs.writeFileSync(path.resolve(jsonPath = path.join(__dirname, dataDir, (fileName ?? 'latest')) + '.json'), JSON.stringify(data, null, 2));
}
async function scrap(type) {
  const dataDir = `/data/${type.path}`;
  var jsonPath = undefined;

  (async function () {
    var _function = await require('./GET')['getVaccinationGiven']();
    return _function;
  })()
    .then((_function) => (_function(type)))
    .then((data) => {
      writeJson(data, dataDir);
      writeJson(data, dataDir, data['dataTime']);
    });
}

Object.values(_types).forEach((type) => {
  scrap(type);
})