export function insertTime ({
	dataTime,
	itemData
}:{
	dataTime: string,
	itemData: {[x:string]:any}
}) {
	return Object.assign(
		{ dataTime },
		itemData
	);
}
