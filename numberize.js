/**
 * Numberizes non-latest jsonData's Numeric String
 */
const fs = require('fs');
const writeJson = require('./write');
const { exec } = require('child_process');
const dirs = [
  "case",
  "vaccination"
];



function numberize(json){
  return Object.fromEntries(Object.entries(json).map(([k,v])=>{
    switch(typeof v){
      case 'number': return [k,v];
      case 'object': return [k,numberize(v)];
      case 'string': return [k,(v.replaceAll(/[^0-9]/g,"") == v)?Number(v):v];
    }
  }));
}

dirs.forEach(dir => {
  exec(`find ${dir} | grep json`,function(err,stdout,stderr) {
    stdout.split('\n').filter((_)=>(_!='')).forEach(jsonPath=>{
      const jsonFileName = jsonPath.substring(jsonPath.lastIndexOf('/') + 1,jsonPath.lastIndexOf('.json'));
      const jsonFileDir = jsonPath.substring(0,jsonPath.lastIndexOf('/'));
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      writeJson(numberize(jsonData),jsonFileDir,jsonFileName);
    });
  });
})
