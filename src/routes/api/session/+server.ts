import fs from 'fs';
import { execSync } from 'child_process';

export const POST = async () => {
	if (!fs.existsSync('./projects')) fs.mkdirSync('./projects');
	let uuid =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	uuid = uuid.substring(0, 5);

	fs.mkdirSync(`./projects/${uuid}`);
	// Run 'npm init -y' in the project folder
	execSync('npm init -y', {
		cwd: `./projects/${uuid}`
	});
	const grammarjs = `
module.exports = grammar({
	name: 'YOUR_LANGUAGE_NAME',

	rules: {
	// TODO: add the actual grammar rules
	source_file: $ => 'hello'
	}
});
	`.trim();
	// Create a grammar.js
	fs.writeFileSync(`./projects/${uuid}/grammar.js`, grammarjs);
	// Run tree-sitter generate
	execSync('tree-sitter generate', {
		cwd: `./projects/${uuid}`
	});
	return new Response(
		JSON.stringify({
			uuid
		})
	);
};
