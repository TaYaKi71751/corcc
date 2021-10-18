const fs = require('fs');
const path = require('path');
const dataDir = '/data';
var jsonPath = undefined;

(async function () {
  var _funciton = await require('./GET')['getVaccinationGiven']();
  return _funciton;
})()
  .then((_function) => (_function()))
  .then((data) => {
    fs.writeFileSync(path.resolve(jsonPath = path.join(__dirname, dataDir, data['to']['day']['dataTime']) + '.json'), JSON.stringify(data, null, 2));
  });