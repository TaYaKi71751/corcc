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

function mohw(response){

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
      //TODO
      const tags = {
        'simple': '.rpsa_detail > div > #mapAll',
        'city': '.rpsa_detail',
      };
      const url = `http://ncov.mohw.go.kr/${type.lang}/bdBoardList.do?brdGubun=${type['brdGubun']}`;
      const res = await axios.get(url);
      console.log(type.name);
      // _$(res.data);
      var data = {};
      data['dataTime'] = mohwTime(_$(res.data));
      Object.entries(tags).forEach(([k, v]) => {
        // console.log(_$(res.data)(v), k, v);
        Object.values(_$(res.data)(v)).forEach((mps) => {
          Object.values(_$(mps)('.cityname')).forEach((cityNm) => {
            console.log(_$(cityNm).text());
          });
          (function () {
            var _name = type.name == 'simple' ? _$(mps)('.cityname').text() : '';
            var _tmp = {};
  
            _slice(_$(mps)('li')).forEach((list) => {
              const _case = {
                'C': 'confirmed',
                'R': 'recovered',
                'D': 'death',
              };
              const tit = (function () { return _$(list)('span.tit'); })().text();
              if (typeof _case[tit[0]] == 'undefined') {
                return;
              }
              const value = filterDigit((function () { return _$(list)('span.num'); })().text());
              _tmp[_case[tit[0]]] = value;
            });
            console.log(_tmp);
          })();
        });
      });
      
      return data;
    });
  },
}