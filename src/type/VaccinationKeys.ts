export = class VaccinationsKeys {
  static path: any = {
    "all": 'counter',
    "sido": 'country'
  };
  static parse: any = {
    "all": {
      /* ******************************** *
       * tpcd : {                         *
       *  A=> Daily on Today        (C-B) *
       *  B=> Total on Yesterday    (C-A) *
       *  C=> Total on Today        (B+A) *
       * }                                *
       ************************************
       * firstCnt  : First  Vaccinated    *
       * secondCnt : Second Vaccinated    *
       * thirdCnt  : Third  Vaccinated    *
       * ******************************** *
       */
      "tpcd": {
        "A": "today",       // (C-B)
        "B": "yesterday_c", // (C-A)
        "C": "today_c",     // (B+A)
      },
      "firstCnt": "firstCnt",
      "secondCnt": "secondCnt",
      "thirdCnt": "thirdCnt"
    },
    "sido": {
      /* *************************************************** *
       *          sidoNm    : City/Province Name             *
       ^^*****************************************************
       *     firstCnt  : Daily data of  First   Vaccinated   *
       *     firstTot  : Total data of  First   Vaccinated   *
       *     secondCnt : Daily data of  Second  Vaccinated   *
       *     secondTot : Total data of  Second  Vaccinated   *
       *     thirdCnt  : Daily data of  Third   Vaccinated   *
       *     thirdTot  : Total data of  Third   Vaccinated   *
       * *************************************************** *
       */
      "sidoNm": {},
      "firstCnt": "firstCnt",
      "firstTot": "firstTot",
      "secondCnt": "secondCnt",
      "secondTot": "secondTot",
      "thirdCnt": "thirdCnt",
      "thirdTot": "thirdTot"
    }
  };
}
// export = module.exports = { VaccinationsKeys };