const axios = require('axios');
const cheerio = require("cheerio");
const _$ = cheerio.load;

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


function isUndefined(v) {
  return typeof v == 'undefined' || v == undefined;
}

function yester(dataTime) {
  return dateFormat(new Date(Date.parse(dataTime) - (_24HoursInMillis = 86400000)));
}

function filterDigit(v) {
  return v.replaceAll(/[^\d]/g,"");
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

function mohwParseCtNm(_map) {
  const cityNm = _$(_map)('.cityname').text();
  return cityNm;
}

function mohwParseCase(_map) {
  const _case = {
    'C': 'confirmed',
    'R': 'recovered',
    'D': 'deaths',
  };
  var caseData = {};
  _slice(_$(_map)('li')).forEach((case_) => {
    const _tit = _$(case_)('span.tit').text()[0];
    const value = filterDigit(_$(case_)('span.num').text());
    if (typeof _case[_tit] == 'undefined') { return; }
    caseData[_case[_tit]] = value;
  });
  return caseData;
}

function mohwParseCaseDataWCtNm(_map) {
  var caseWCtNmData = {};
  caseWCtNmData[mohwParseCtNm(_map)] = mohwParseCase(_map);
  return caseWCtNmData;
}

async function mohwJson(res) {
  const type = {
    'simple': '.rpsa_detail > div > #mapAll',
    'city': '.rpsa_detail > div > div',
  };
  return Object.fromEntries(Object.entries(type).map(([dataType, selectors]) => {
    console.log(dataType, selectors)
    return [dataType, JSON.parse(JSON.stringify(_slice(_$(res.data)(selectors)).map((_map) => {
      const rtn = mohwParseCaseDataWCtNm(_map);
      if (!dataType.includes("sim")) {
        return rtn;
      }
      return Object.entries(rtn)[0][1];
    })).replaceAll("},{", ",").replaceAll(/[\[\]]/g, "").replace("{", "{" + `"dataTime":"${mohwTime(_$(res.data))}",`))];
  }));
}

module.exports = {
  "getVaccinationGiven": async function () {
    return (async function (type) {
      const isExistTpcd = typeof type.tpcd != 'undefined';
      var data = await axios.get(`https://nip.kdca.go.kr/irgd/cov19stats.do?list=${type.list}`);
      data = _$(data.data);
      const dataTime = dateFormat(data('dataTime').text().replaceAll(/[(\.|\/)]/g,"-"))
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
              return [cnt[0].tagName, cnt.text()];
            }).filter(([, v]) => (typeof v != "undefined")))];
        }));
      })).replaceAll("},{", ",").replaceAll(/[\[\]]/g, "").replace("{", `{"dataTime":"${dataTime}",`));
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