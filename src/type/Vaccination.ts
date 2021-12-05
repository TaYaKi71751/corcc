type VaccinationData = {
  firstCnt: BigInt | Number | bigint | number | string;
  firstTot?: BigInt | Number | bigint | number | string;
  secondCnt: BigInt | Number | bigint | number | string;
  secondTot?: BigInt | Number | bigint | number | string;
  thirdCnt: BigInt | Number | bigint | number | string;
  thirdTot?: BigInt | Number | bigint | number | string;
}

type URLParams = {
  list: string;
}

export { VaccinationData, URLParams }