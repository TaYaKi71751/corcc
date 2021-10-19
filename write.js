const fs = require('fs');
const path = require('path');
module.exports = async function writeJson(data, dataDir, fileName) {
  fs.writeFileSync(path.resolve(jsonPath = path.join(__dirname, dataDir, (fileName ?? 'latest')) + '.json'), JSON.stringify(data, null, 2));
};