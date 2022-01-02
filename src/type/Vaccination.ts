type VaccinationData = {
	firstCnt: bigint | number | string;
	firstTot?: bigint | number | string;
	secondCnt: bigint | number | string;
	secondTot?: bigint | number | string;
	thirdCnt: bigint | number | string;
	thirdTot?: bigint | number | string;
}

type URLParams = {
	list: string;
}

export {VaccinationData, URLParams};
