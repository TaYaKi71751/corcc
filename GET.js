const axios = require('axios');
const cheerio = require("cheerio");
const _$ = cheerio.load;

const dateFormat = new Intl.DateTimeFormat('ja-JP').format;

function _dataTime(dataTime, a, b) {
  var __d = dataTime;
  while (__d.includes(a)) __d = __d.replace(a, b);
  return __d;
}

function isUndefined(v) {
  return typeof v == 'undefined' || v == undefined;
}

function yester(dataTime) {
  return dateFormat(new Date(Date.parse(dataTime) - (_24HoursInMillis = 86400000)));
}

function filterDigit(v) {
  while (v != v.replace(/[^\d]/, "")) { v = v.replace(/[^\d]/, ""); }
  return v;
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

function mohwTime(_data) {
  var v = _data('.timetable');
  v = v.text();
  v = v.split(/[^\d]/).filter((_) => _ != '');
  v = (function () {
    var _tmp = v;
    _tmp = _tmp[0].length < 3 ? _tmp.slice(1) : _tmp;
    return `${_tmp[0]}-${_tmp[1]}-${_tmp[2]}`;
  })();
  return v;
}

async function mohwJson(res) {
  const type = {
    'simple': '.rpsa_detail > div > #mapAll',
    'city': '.rpsa_detail > div > div',
  }, _case = {
    'C': 'confirmed',
    'R': 'recovered',
    'D': 'death',
  };
  var data = {};
  data['simple'] = (function () {
    var simpleData = {};
    _slice(_$(res.data)(type['simple'])).forEach((_map) => {
      _slice(_$(_map)('li')).forEach((case_) => {
        const _tit = _$(case_)('span.tit').text()[0];
        const value = filterDigit(_$(case_)('span.num').text());
        if (isUndefined(_case[_tit])) { return; }
        simpleData[_case[_tit]] = value;
      });
    });
    simpleData['dataTime'] = mohwTime(_$(res.data));
    return simpleData;
  })();
  data['city'] = (function () {
    var cityData = {};
    _slice(_$(res.data)(type['city'])).forEach((_map) => {
      cityData[_$(_map)('.cityname').text()]=(function(){
        var caseData = {};
        _slice(_$(_map)('li')).forEach((case_) => {
          const _tit = _$(case_)('span.tit').text()[0];
          const value = filterDigit(_$(case_)('span.num').text());
          if (isUndefined(_case[_tit])) { return; }
          caseData[_case[_tit]] = value;
        });
        return caseData;
      })();
    });
    cityData['dataTime'] = mohwTime(_$(res.data));
    return cityData;
  })();
  return data;
}

module.exports = {
  "getVaccinationGiven": async function () {
    return (async function (type) {
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
    return (async function (type) {
      const url = `http://ncov.mohw.go.kr/${type.lang}/bdBoardList.do?brdGubun=${type['brdGubun']}`;
      const res = await axios.get(url);
      var data = await mohwJson(res);
      return data;
    });
  },
}