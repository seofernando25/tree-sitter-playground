import fs from 'fs/promises';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (r) => {
	const project = r.params.project;

	return {
		project,
		grammarjs: fs.readFile(`./projects/${project}/grammar.js`, 'utf8')
	};
};
