
const scheme = 'http';
const domain = 'ncov.kdca.go.kr';
function getLangPath (lang: string) {
	return {
		cn: 'cn',
		en: 'en',
		ko: undefined
	}[lang];
}
function bdBoardList (lang: string) {
	return {
		cn: 'bdBoardList.do',
		en: 'bdBoardList.do',
		ko: 'bdBoardList_Real.do'
	}[lang];
}
function brdGubun (lang: string) {
	return {
		cn: '262',
		en: '162',
		ko: '13'
	}[lang];
}
export function getUrl (
	lang:string
) {
	const langPath = getLangPath(lang);
	const protocol = `${scheme}:`;
	const host = `${domain}`;
	const path = `/${!langPath ? '' : (langPath + '/')
	}${bdBoardList(lang)
	}?brdGubun=${brdGubun(lang)}`;
	const options = {
		protocol,
		host,
		path,
		method: 'GET',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0',
			Connection: 'keep-alive'
		}
	};
	return options;
}
