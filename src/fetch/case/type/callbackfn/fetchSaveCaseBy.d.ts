export type CatchCallbackfnParams = {
	name: string,
	lang: string,
	data: any,
	error?: any | ErrorEvent
}
export type CatchCallbackfn = ({
	name,
	lang,
	data,
	error,
}: CatchCallbackfnParams) => any
