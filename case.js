const { exit } = require('process');
const writeJson = require('./write');
const _types = {
  "getCases":
    [
      {
        'lang': 'en',
        'brdGubun': '162'
      },
      // {
      //   'lang': 'cn',
      //   'brdGubun': '262'
      // },
    ],
};

function scrap(fnNm, type) {
  const dataDir = `/case/`;
  var _function = require('./GET')[fnNm]();
  const data = _function(type);
  Object.entries(data).forEach(([k, v]) => {
    if (k == 'simple') {
      writeJson(v, dataDir);
    }
    writeJson(v, dataDir + k);
    writeJson(v, dataDir + k, v['dataTime']);
  })
}

Object.entries(_types).forEach(([fnNm, v]) => {
  v.forEach(v => {
    scrap(fnNm, v);
  })
})