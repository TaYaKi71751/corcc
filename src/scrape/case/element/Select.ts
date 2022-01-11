export const selectors: {
	[x: string]: string
} = {
	counter: '.rpsa_detail > div > #mapAll',
	country: '.rpsa_detail > div > div',
};

const ok = Object.keys;

export function getSelectorKeys() {
	return ok(selectors);
}

export function getSelector(_t: string) {
	const selector = selectors[`${_t}`];
	return selector;
}
