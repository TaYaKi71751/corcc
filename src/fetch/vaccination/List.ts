const ok = Object.keys;
export const list: any = {
	all: 'counter',
	sido: 'country'
};

export function listKeys () {
	return ok(list);
}

export function listValue (_list:string):string {
	return list[`${_list}`];
}
