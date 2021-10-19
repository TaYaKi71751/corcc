const axios = require('axios');
const cheerio = require("cheerio");
const _$ = cheerio.load;

const dateFormat = new Intl.DateTimeFormat('ja-JP').format;

function _dataTime(dataTime, a, b) {
  var __d = dataTime;
  while (__d.includes(a)) __d = __d.replace(a, b);
  return __d;
}

function yester(dataTime) {
  return dateFormat(new Date(Date.parse(dataTime) - (_24HoursInMillis = 86400000)));
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

function _Date(_date) {
  return new Date(Date.parse(_date))
}

module.exports = {
  "getVaccinationGiven": async function () {
    return (async function getData(type) {
      const isExistTpcd = typeof type.tpcd != 'undefined';
      var data = await axios.get(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${type.list}`);
      data = _$(data.data);
      const dataTime = _dataTime(dateFormat(_Date(_dataTime(data('dataTime').text(), "\.", "\-"))), "\/", "\-")
        , _tpcd = isExistTpcd ? type.tpcd : undefined
        , _tags = type._tags;
      var items = _slice(data('item'));
      data = {};
      data['dataTime'] = dataTime;
      items.forEach((item) => {
        var tpcd = isExistTpcd ? __tpcd(item) : __sidoNm(item);
        Object.entries(isExistTpcd ? _tpcd[tpcd] : __sidoNm(item)).forEach(([k, v]) => {
          data[isExistTpcd ? k : v] = typeof data[isExistTpcd ? k : v] == 'undefined' ? {} : data[isExistTpcd ? k : v];
          data[isExistTpcd ? k : v] = (function (item) {
            return (function (_xml) {
              var _Cnts = {};
              Object.keys(_tags).forEach((_tag) => {
                const cnt = _$(_xml)(_tag);
                if (cnt.length == 0) {
                  _Cnts[_tag] = k.includes('to') ?
                    dataTime :
                    yester(dataTime);
                  return;
                }
                _Cnts[cnt[0].tagName] = cnt.text();
              });
              return _Cnts;
            })(item);
          })(item);
        });

      });
      return data;
    });
  }, "getCases": async function () {
    (async function getData(type) {
      const host = 'http://ncov.mohw.go.kr';
      var data = await axios.get(`/${(type.lang == 'ko') ? (type.lang + '/') : ''}bdBoardList.do?brdGubun=${tyoe.brdGubun}`);
    })
  }
}