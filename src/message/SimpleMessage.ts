const { exit } = require("process");
const fs = require('fs');
const JSONBig = require('json-bigint');
const { exec, execSync } = require("child_process");
const pwd = execSync(`pwd`).toString().replace('\n', '');

// const paths = {
//   'case': [
//     'latest/case/counter.json',
//   ],
//   'vaccination': [
//     'latest/vaccination/counter/daily.json',
//     'latest/vaccination/counter/today.json',
//     'latest/vaccination/counter/yesterday.json'
//   ]
// };

const toMarkdown = function (paths: string[]) {
  return paths.map((path) => {
    const read = execSync(`cat ${pwd}/${path}`).toString()
    const json = JSONBig.parse(read);
    const table_keys = Object.keys(json);
    const table_values = Object.values(json);
    const md = (
      `${table_keys.join('|')}` + '\n' +
      `${(function (length) {
        var r = "";
        for (var i = 0; i < length; i++) {
          r += r ? '-|' : '|-|'
        }
        return r;
      })(table_keys.length)}` + '\n' +
      `${table_values.join('|')}`
    );
    const msgPath = path.replace('latest', 'markdown').replace('json', 'md');
    try {
      execSync(`ls ${pwd}/${msgPath.substring(0, msgPath.lastIndexOf('/'))}`).toString()
    } catch (e) {
      console.error(new String(e));
      try {
        execSync(`mkdir -p ${pwd}/${msgPath.substring(0, msgPath.lastIndexOf('/'))}`).toString();
      } catch (e) {
        exit(0xDD);
      }
    } finally {
      try {
        execSync(`ls ${pwd}/${msgPath.substring(0, msgPath.lastIndexOf('/'))}/.gitkeep`).toString();
      } catch (e) {
        console.error(new String(e));
        try {
          execSync(`echo ''> ${pwd}/${msgPath.substring(0, msgPath.lastIndexOf('/'))}/.gitkeep`);
        } catch (e) {
          exit(0xDF);
        }
      }
    }
    fs.writeFileSync(`${pwd}/${msgPath}`, md);
    return md;
  })
}
export { toMarkdown }