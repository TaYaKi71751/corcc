const axios = require('axios');
const cheerio = require("cheerio");
module.exports = {
    "getVaccinationGiven": async function () {
        return (async function getData() {
            var data = await axios.get('https://nip.kdca.go.kr/irgd/cov19stats.do?list=all');
            data = cheerio.load(data.data);
            var items = (function (v) {
                return Object.values(v).slice(0, v.length);
            })(data('item'));
            var dataTime = (data('dataTime').text()).replaceAll(".", "-");
            dataTime = new Intl.DateTimeFormat('ja-JP').format(new Date(Date.parse(dataTime))).replaceAll("/", "-");
            data = {};
            items.forEach((item) => {
                const tpcd = cheerio.load(item)('tpcd').text().replaceAll(/[^a-zA-Z]/g, "")[0]
                , _tpcd = {
                    'A': { 'to': 'day' },    //Today         TZ=>KST
                    'B': { 'yes': 'cum' },   //Yesterday's Cumulative
                    'C': { 'to': 'cum' },    //Today's Cumulative
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
                                    _Cnts[_tag] = dataTime;
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