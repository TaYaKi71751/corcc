//TODO
const brdGubun = {
  'ko': '13',
  'en': '162',
  'cn': '262'
};
const _type = {
  "getCases": {
    "daily": {
      "lang": Object.keys(brdGubun),
      "path": `case//daily`
    },
    "regions": {
      "lang": Object.keys(brdGubun),
      "path": `case//regions`,
      "brdGubun": Object.values(brdGubun),
    },
  },
};

async function scrap(fnNm, type) {
  const dataDir = `/data/${type.path}`;
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
    .then((data) => {
      if (data[''])
        writeJson(data, dataDir);
      writeJson(data, dataDir, data['dataTime']);
    });
}

Object.entries(_types).forEach(([fnNm, v]) => {
  Object.values(v).forEach((v) => {
    scrap(fnNm, v);
  });
})