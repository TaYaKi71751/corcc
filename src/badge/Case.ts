import { saveBadges } from './SVGBadge';
const casePaths = [
	'./latest/case/counter.json'
];
casePaths.map((path: string) => saveBadges(path));
