import {saveBadges} from './SVGBadge';
const vaccinationPaths = [
	'latest/vaccination/counter/daily.json',
	'latest/vaccination/counter/today.json',
	'latest/vaccination/counter/yesterday.json',
];
vaccinationPaths.map((path) => saveBadges(path));
