type CaseData = {
  confirmed: BigInt | Number | bigint | number | string;
  deaths: BigInt | Number | bigint | number | string;
  recovered: BigInt | Number | bigint | number | string;
}

type Lang = {
  lang: string;
}

type Title = {
  title: string;
}

type Value = {
  value: BigInt | Number | bigint | number | string;
}



export { CaseData, Title, Value, Lang }