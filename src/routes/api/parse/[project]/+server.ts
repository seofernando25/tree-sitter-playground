import { execSync } from 'child_process';
import fs from 'fs';

export const POST = async (r) => {
	console.log('PARSE');
	// Get grammarjs from body
	const project = r.params.project;
	const body = await r.request.json();
	const text = body.text;

	fs.writeFileSync(`./projects/${project}/text.txt`, text);
	try {
		// Call tree-sitter parse and return XML
		const res = execSync('tree-sitter parse text.txt -x', {
			cwd: `./projects/${project}`
		});
		return new Response(res.toString());
	} catch (error) {
		// @ts-expect-error - untyped error
		return new Response(String(error.stdout.toString()));
	}
};
