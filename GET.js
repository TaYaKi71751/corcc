const axios = require('axios');
const { exec, execSync } = require('child_process');
const cheerio = require("cheerio");
const _$ = cheerio.load;
const userAgent = 'Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6';
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

function mohwParseCaseDataWCtNm(_map) {
  const mohwParseCtNm = (function (_map) {
    const cityNm = _$(_map)('.cityname').text();
    return cityNm;
  });
  const mohwParseCase = (function (_map) {
    const _case = {
      '确': 'confirmed',
      '解': 'recovered',
      '死': 'deaths',
      'C': 'confirmed',
      'R': 'recovered',
      'D': 'deaths',
    };
    var caseData = {};
    _slice(_$(_map)('li')).forEach((case_) => {
      const _tit = _$(case_)('span.tit').text().trim();
      const value = filterDigit(_$(case_)('span.num').text());
      if(_tit!= _tit.replaceAll(/[A-Za-z]/g,"")){
        if (typeof _case[_tit[0]] == 'undefined') { return; }
        caseData[_case[_tit[0]]] = (value.replaceAll(/[^0-9]/g) == value ? Number(value) : value);
      }else {
        if (typeof _case[Object.values(_tit).filter((_)=>(_tit.includes(_)))[0]] == 'undefined') { return; }
        caseData[_case[Object.values(_tit).filter((_)=>(_tit.includes(_)))[0]]] = (value.replaceAll(/[^0-9]/g) == value ? Number(value) : value);
      }
    });
    return caseData;
  });

  var caseWCtNmData = {};
  caseWCtNmData[mohwParseCtNm(_map)] = mohwParseCase(_map);
  return caseWCtNmData;
}

function mohwJson(res) {
  const mohwTime = (function (_data) {
    var v = innerFind(_data, '.timetable', '.info', 'span').text().trim();
    v = v.split(/[^\d]/).filter((_) => _ != '');
    return dateFormat(Date.parse(`${(new Date()).getFullYear()}-${v[v.length - 2]}-${v[v.length - 1]}`));
  });
  const type = {
    'simple': '.rpsa_detail > div > #mapAll',
    'city': '.rpsa_detail > div > div',
  };
  return Object.fromEntries(Object.entries(type).map(([dataType, selectors]) => {
    return [dataType, JSON.parse(JSON.stringify(_slice(_$(res)(selectors)).map((_map) => {
      const rtn = mohwParseCaseDataWCtNm(_map);
      if (!dataType.includes("sim")) {
        return rtn;
      }
      return Object.entries(rtn)[0][1];
    })).replaceAll("},{", ",").replaceAll(/[\[\]]/g, "").replace("{", "{" + `"dataTime":"${mohwTime(_$(res))}",`))];
  }));
}

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
  }, "getCases": function () {
    return (function (type) {
      const url = `http://ncov.mohw.go.kr/${type.lang ? (type.lang + '/') : ''}bdBoardList.do?brdGubun=${type['brdGubun']}`;
      console.log(url);
      const res = execSync(`curl -LsSf ${url} -A "${userAgent}" -o -`).toString();
      var data = mohwJson(res);
      return data;
    });
  },
}