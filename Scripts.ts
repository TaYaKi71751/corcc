const scripts = {
	'scripts': {
		update: 'ts-node Scripts.Update.ts',
	},
	'lint': {
		run: 'eslint',
		fix: 'eslint --fix --ext .ts,.tsx .',
	},
	'tweet': {
		today: {
			vaccination: 'ts-node ./src/tweet/today/Vaccination.ts',
			case: 'ts-node ./src/tweet/today/Case.ts',
		},
	},
	'badge': {
		vaccination: 'ts-node ./src/badge/Vaccination.ts',
		case: 'ts-node ./src/badge/Case.ts',
	},
	'plain': {
		vaccination: 'ts-node ./src/plain/Vaccination.ts',
		case: 'ts-node ./src/plain/Case.ts',
	},
	'fetch': {
		vaccination: 'ts-node ./run/fetch/Vaccination.ts',
		case: 'ts-node ./run/fetch/Case.ts',
	},
};
export {scripts};
