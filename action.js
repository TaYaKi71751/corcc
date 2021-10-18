const fs = require('fs');
const path = require('path');
const dataDir = '/data';
var jsonPath = undefined;
function writeJson(data, fileName) {
  fs.writeFileSync(path.resolve(jsonPath = path.join(__dirname, dataDir, (fileName ?? 'latest')) + '.json'), JSON.stringify(data, null, 2));
}
(async function () {
  var _funciton = await require('./GET')['getVaccinationGiven']();
  return _funciton;
})()
  .then((_function) => (_function()))
  .then((data) => {
    writeJson(data);
    writeJson(data,data['today']['on']['dataTime']);
  });