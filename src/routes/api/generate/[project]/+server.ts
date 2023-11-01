import { execSync } from 'child_process';
import fs from 'fs';

export const POST = async (r) => {
	console.log('GENERATE');
	// Get grammarjs from body
	const project = r.params.project;
	const body = await r.request.json();
	const grammarjs = body.grammarjs;

	// Replace ./projects/{project}/grammar.js with grammarjs
	fs.writeFileSync(`./projects/${project}/grammar.js`, grammarjs);

	try {
		const res = execSync('tree-sitter generate', {
			cwd: `./projects/${project}`
		});
		return new Response(res.toString());
	} catch (error) {
		console.error('err:', error);
		return new Response(String(error));
	}
};
