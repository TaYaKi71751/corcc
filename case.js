const { exit } = require('process');
const writeJson = require('./write');
const _types = {
  "getCases": {
    'lang': 'en',
    'brdGubun': '162'
  },
};

function scrap(fnNm, type) {
  const dataDir = `/case/`;
  var jsonPath = undefined;

  (async function () {
    var _function = await require('./GET')[fnNm]();
    return _function;
  })()
    .then((_function) => (_function(type)))
    .catch((error) => {
      console.error(error);
      exit(-1);
    })
    .then((data)=>(data))
    .then((data) => {
      Object.entries(data).forEach(([k,v])=>{

        writeJson(v, dataDir+k);
        writeJson(v, dataDir+k, v['dataTime']);
      })
    });
}

Object.entries(_types).forEach(([fnNm, v]) => {
  scrap(fnNm, v);
})