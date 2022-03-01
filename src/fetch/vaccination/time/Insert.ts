export function insertTime ({
	dataTime,
	itemData
}:{
    dataTime: string,
    itemData: any
}) {
	let _a = itemData;
	_a = (function (_d:any):any {
		const _s = JSON.stringify(_d);
		const _t = `"dataTime":"${dataTime}"`;
		const _r = _s.replace('{', `{${_t},`);
		const _j = JSON.parse(_r);
		return _j;
	})(_a);
	return _a;
}
