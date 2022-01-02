function tryCatch({
	func,
	catchFunc,
	params,
	catchParams,
}: any): any {
	try {
		return func(params);
	} catch (e) {
		if (catchFunc) {
			return tryCatch({
				func: catchFunc,
				params: catchParams,
			});
		}
		throw e;
	}
}
export {tryCatch};
