const scripts = {
	scripts: {
		update: 'ts-node Scripts.Update.ts'
	},
	lint: {
		run: 'eslint --ext .ts,.tsx .',
		fix: 'eslint --fix --ext .ts,.tsx .'
	},
	tweet: {
		today: {
			vaccination: 'ts-node ./src/tweet/today/Vaccination',
			case: 'ts-node ./src/tweet/today/Case',
			all: 'yarn tweet:today:case && yarn tweet:today:vaccination'
		},
		all: 'yarn tweet:today:all'
	},
	slack: {
		daily: {
			vaccination: 'ts-node ./src/slack/daily/Vaccination',
			all: 'yarn slack:daily:vaccination'
		},
		today: {
			case: 'ts-node ./src/slack/today/Case',
			vaccination: 'ts-node ./src/slack/today/Vaccination',
			all: 'yarn slack:today:case && yarn slack:today:case'
		},
		all: 'yarn slack:today:all && yarn slack:daily:all'
	},
	badge: {
		vaccination: 'ts-node ./src/badge/Vaccination.ts',
		case: 'ts-node ./src/badge/Case.ts',
		all: 'yarn badge:case && yarn badge:vaccination'
	},
	plain: {
		vaccination: 'ts-node ./src/plain/Vaccination.ts',
		case: 'ts-node ./src/plain/Case.ts',
		all: 'yarn plain:case && yarn plain:vaccination'
	},
	fetch: {
		vaccination: 'ts-node ./run/fetch/Vaccination.ts',
		case: 'ts-node ./run/fetch/Case.ts',
		all: 'yarn fetch:case && yarn fetch:vaccination'
	}
};
export { scripts };
