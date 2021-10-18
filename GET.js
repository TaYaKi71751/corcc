const axios = require('axios');
const cheerio = require("cheerio");

const dateFormat = new Intl.DateTimeFormat('ja-JP').format;

function _dataTime(dataTime, a, b) {
    var __d = dataTime;
    while (__d.includes(a)) __d = __d.replace(a, b);
    return __d;
}

function yester(dataTime){
    return dateFormat(new Date(Date.parse(dataTime) - (_24HoursInMillis = 86400000)));
}

function __tpcd(item) {
    return Object.values(cheerio.load(item)('tpcd').text().split(/[^a-zA-Z]/)).filter((__i) => __i != '')[0];
}

function _slice(v) {
    return Object.values(v).slice(0, v.length);
}

function _Date(_date){
    return new Date(Date.parse(_date))
}

module.exports = {
    "getVaccinationGiven": async function () {
        return (async function getData() {
            var data = await axios.get('https://nip.kdca.go.kr/irgd/cov19stats.do?list=all');
            data = cheerio.load(data.data);
            const dataTime = _dataTime(dateFormat(_Date(_dataTime(data('dataTime').text(), "\.", "\-"))), "\/", "\-");
            var items = _slice(data('item'));
            data = {};
            items.forEach((item) => {
                var tpcd = __tpcd(item);
                const _tpcd = {
                    'A': { 'today': 'on' },    //Today         TZ=>KST
                    'B': { 'yesterday': 'cumulative' },   //Yesterday's Cumulative
                    'C': { 'today': 'cumulative' },    //Today's Cumulative
                }, _tags = {
                    "dataTime": "",
                    "firstCnt": "",
                    "secondCnt": "",
                    "thirdCnt": "",
                };
                Object.entries(_tpcd[tpcd]).forEach(([k, v]) => {
                    data[k] = typeof data[k] == 'undefined' ? {} : data[k];
                    data[k][v] = (function (item) {
                        return (function (_xml) {
                            var _Cnts = {};
                            Object.keys(_tags).forEach((_tag) => {
                                const cnt = cheerio.load(_xml)(_tag);
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
    }
}