import fs from 'fs';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	// Get a list of sessions
	if (!fs.existsSync('./projects')) fs.mkdirSync('./projects');
	const projects = fs.readdirSync('./projects');
	console.log(projects);

	return {
		projects
	};
};
