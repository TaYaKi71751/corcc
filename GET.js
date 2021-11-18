require('dotenv').config();
const axios = require('axios');

const { exec, execSync } = require('child_process');
const cheerio = require("cheerio");
const _$ = cheerio.load;
const userAgent = process.env.USER_AGENT;
const dateFormat = function (date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
};

function curl(url){
  return execSync(`curl -LsSf ${url} -A "${userAgent}" -o -`).toString();
}

function yester(dataTime) {
  return dateFormat(new Date(Date.parse(dataTime) - (_24HoursInMillis = 86400000)));
}

function filterDigit(v) {
  return v.replaceAll(/[^\d]/g, "");
}

function __tpcd(item) {
  return Object.values(_$(item)('tpcd').text().split(/[^a-zA-Z]/)).filter((__i) => __i != '')[0];
}

function __sidoNm(item) {
  return Object.values(_$(item)('sidoNm').text().split(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/).filter((__i) => __i != ''));
}

function _slice(v) {
  return Object.values(v).slice(0, v.length);
}

function isType(variable, variable_type) {
  return !(typeof variable != variable_type);
}


const innerFind = (function (DOM, ...selectors) {
  const html = (function (DOM) {
    return _$(DOM.html());
  });
  selectors = selectors ? (isType(selectors[0], 'string')
    ? selectors
    : selectors[0]) : undefined;
  const _ = html(DOM);
  return selectors.length ? innerFind(_(selectors[0]), selectors.slice(1, selectors.length)) : _;
});



module.exports = {
  "getVaccinationGiven": async function () {
    return (async function (type) {
      const isExistTpcd = typeof type.tpcd != 'undefined';
      var data = await axios.get(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${type.list}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6' }
      });
      data = _$(data.data);
      const dataTime = dateFormat(data('dataTime').text().replaceAll(/[(\.|\/)]/g, "-"))
        , _tpcd = isExistTpcd ? type.tpcd : undefined
        , _tags = type._tags;
      return JSON.parse(JSON.stringify(_slice(data('item')).map((item) => {
        var tpcd = isExistTpcd ? __tpcd(item) : __sidoNm(item);
        return Object.fromEntries(Object.entries(isExistTpcd ? _tpcd[tpcd] : __sidoNm(item)).map(([k, v]) => {
          return [isExistTpcd ? k : v, Object.fromEntries(
            Object.entries(_tags).map(([_tag,]) => {
              const cnt = _$(item)(_tag);
              if (cnt.length == 0) {
                return [_tag, k.includes('to') ? dataTime : yester(dataTime)];
              }
              const cntText = cnt.text();
              return [cnt[0].tagName, (cntText.replaceAll(/[^0-9]/g, "") == cntText ? Number(cntText) : cntText)];
            }).filter(([, v]) => (typeof v != "undefined")))];
        }));
      })).replaceAll("},{", ",").replaceAll(/[\[\]]/g, "").replace("{", `{"dataTime":"${dataTime}",`));
    });
  }
}