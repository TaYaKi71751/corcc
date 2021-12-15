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
    console.log(md);
    const mdPath = path.replace('latest', 'markdown').replace('.json', '.md');
    try {
      execSync(`ls ${pwd}/${mdPath.substring(0, mdPath.lastIndexOf('/'))}`).toString()
    } catch (e) {
      console.error(new String(e));
      try {
        execSync(`mkdir -p ${pwd}/${mdPath.substring(0, mdPath.lastIndexOf('/'))}`).toString();
      } catch (e) {
        exit(0xDD);
      }
    } finally {
      try {
        execSync(`ls ${pwd}/${mdPath.substring(0, mdPath.lastIndexOf('/'))}/.gitkeep`).toString();
      } catch (e) {
        console.error(new String(e));
        try {
          execSync(`echo ''> ${pwd}/${mdPath.substring(0, mdPath.lastIndexOf('/'))}/.gitkeep`);
        } catch (e) {
          exit(0xDF);
        }
      }
    }
    fs.writeFileSync(`${pwd}/${mdPath}`, md);
    const slackMarkdown = Object.entries(json).map(([k, v]) => {
      const key = k;
      const value = v;
      return `*${k}*\n\r- ${v}`;
    });
    console.log(slackMarkdown.join('\n'));
    const slackMarkdownPath = path.replace('latest', 'markdown').replace('.json', '.slack.md');

    try {
      execSync(`ls ${pwd}/${slackMarkdownPath.substring(0, slackMarkdownPath.lastIndexOf('/'))}`).toString()
    } catch (e) {
      console.error(new String(e));
      try {
        execSync(`mkdir -p ${pwd}/${slackMarkdownPath.substring(0, slackMarkdownPath.lastIndexOf('/'))}`).toString();
      } catch (e) {
        exit(0xDD);
      }
    } finally {
      try {
        execSync(`ls ${pwd}/${slackMarkdownPath.substring(0, slackMarkdownPath.lastIndexOf('/'))}/.gitkeep`).toString();
      } catch (e) {
        console.error(new String(e));
        try {
          execSync(`echo ''> ${pwd}/${slackMarkdownPath.substring(0, slackMarkdownPath.lastIndexOf('/'))}/.gitkeep`);
        } catch (e) {
          exit(0xDF);
        }
      }
    }
    fs.writeFileSync(`${pwd}/${slackMarkdownPath}`, slackMarkdown.join('\n'));
    return [md, slackMarkdown];
  })
}
export { toMarkdown }