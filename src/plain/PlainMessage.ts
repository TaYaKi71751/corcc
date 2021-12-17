import { Utilities } from '../util/Utilities';
const { exit } = require("process");
const fs = require('fs');
const JSONBig = require('json-bigint');
const { exec, execSync } = require("child_process");
const thousands = require('thousands');
const pwd = execSync(`pwd`).toString().replace('\n', '');

const util = new Utilities();

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
function prepare(path: string) {
  try {
    execSync(`ls ${pwd}/${path.substring(0, path.lastIndexOf('/'))}`).toString()
  } catch (e) {
    console.error(new String(e));
    try {
      execSync(`mkdir -p ${pwd}/${path.substring(0, path.lastIndexOf('/'))}`).toString();
    } catch (e) {
      exit(0xDD);
    }
  } finally {
    try {
      execSync(`ls ${pwd}/${path.substring(0, path.lastIndexOf('/'))}/.gitkeep`).toString();
    } catch (e) {
      console.error(new String(e));
      try {
        execSync(`echo ''> ${pwd}/${path.substring(0, path.lastIndexOf('/'))}/.gitkeep`);
      } catch (e) {
        exit(0xDF);
      }
    }
  }
}

const emoji: any = {
  "case": '🦠📅',
  "vaccination": "💉📅",
  "firstCnt": "☝️",
  "secondCnt": "✌️",
  "thirdCnt": "🤟",
  "dataTime": "📅",
  "confirmed": "🦠",
  "deaths": "💀",
  "recovered": "😊"
}

const getMessage:any = {
  'slack':function(k:any,v:any){
    const key: string = `*${emoji[k]}*`;
    const value = util.isNumberOnly(`${v}`) ? thousands(v) : v;
    return `${key} ${value}`;
  },
  'twitter':function(k:any,v:any){
    const key: string = `  ${emoji[k]}`;
    const value = util.isNumberOnly(`${v}`) ? thousands(v) : v;
    return `${key} ${value}`;
  }
}

function plainTextMessage({
  json,
  platform,
}:any){
  const data = Object.entries(json).map(([k, v]: any) => getMessage[platform](k,v));
  return Object.values(data).join('\n');
}

function titleEmojiPrefix({
  path
}:any){
  const _ = (function (p) {
    if (p.includes('/case/')) { return 'case'; }
    if (p.includes('/vaccination/')) { return 'vaccination'; }
    return;
  })(path) ?? "_";
  return (emoji[_] ?? "") + (emoji[_] ? "\n" : "");
}


const toMarkdown = function (paths: string[]) {
  return paths.map((path) => {
    const _ = (function (p) {
      if (p.includes('/case/')) { return 'case'; }
      if (p.includes('/vaccination/')) { return 'vaccination'; }
      return;
    })(path) ?? "_";
    const read = execSync(`cat ${pwd}/${path}`).toString()
    const json = JSONBig.parse(read);
    const table_keys = Object.keys(json);
    const table_values = Object.values(json).map((a)=>{
      return `${a}`;
    });
    const tableMarkdown = (
      `|${table_keys.join('|')}|` + '\n' +
      `${(function (length) {
        var r = "";
        for (var i = 0; i < length; i++) {
          r += r ? '-|' : '|-|'
        }
        return r;
      })(table_keys.length)}` + '\n' +
      `|${table_values.join('|')}|`
    );
    console.log(tableMarkdown);
    const tableMarkdownPath = path.replace('latest', 'plain').replace('.json', '.table.md');
    prepare(tableMarkdownPath);
    fs.writeFileSync(`${pwd}/${tableMarkdownPath}`, tableMarkdown);
    const slackMarkdown = titleEmojiPrefix({path}) + plainTextMessage({json,platform:'slack'});
    console.log(slackMarkdown);
    const slackMarkdownPath = path.replace('latest', 'plain').replace('.json', '.slack.md');
    prepare(slackMarkdownPath);
    fs.writeFileSync(`${pwd}/${slackMarkdownPath}`, slackMarkdown);
    const tweetText = titleEmojiPrefix({path}) + plainTextMessage({json,platform:'twitter'});
    console.log(tweetText);
    const tweetTextPath = path.replace('latest', 'plain').replace('.json', '.tweet.txt');
    prepare(tweetTextPath);
    fs.writeFileSync(`${pwd}/${tweetTextPath}`, tweetText);
    return [tableMarkdown, slackMarkdown, tweetText];
  })
}
export { toMarkdown }
