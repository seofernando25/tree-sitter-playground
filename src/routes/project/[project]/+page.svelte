<script lang="ts">
	import Monaco from '../../../lib/Monaco.svelte';
	import type { PageData } from './$types';
	import * as monaco from 'monaco-editor';
	import Tree from '../../../lib/Tree.svelte';

	export let data: PageData;

	let grammarjs = data.grammarjs;
	let text = '';
	let parseTree = '';
	// Start with empty xml
	let respXML: XMLDocument = new DOMParser().parseFromString('', 'text/xml');
	let markers: monaco.editor.IMarker[] = [];
	$: errors = markers.filter((m) => m.severity === monaco.MarkerSeverity.Error);
	$: hasErrors = errors.length > 0;

	let timeout: ReturnType<typeof setTimeout>;
	function debounce(func: () => void, wait: number) {
		clearTimeout(timeout);
		timeout = setTimeout(func, wait);
	}

	async function generate() {
		if (hasErrors) {
			parseTree = 'Not generating due to syntax errors';
			parseTree += '\n\n' + errors.map((m) => m.message).join('\n');
			return false;
		}

		const generateResponse = await fetch(`/api/generate/${data.project}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ grammarjs: grammarjs })
		});
		const respText = (await generateResponse.text()).trim();
		console.log('respText', respText);
		if (respText.length > 0) {
			parseTree = respText;
			return false;
		}
		return true;
	}

	async function parse() {
		// send text to parse/{project}
		const parseResponse = await fetch(`/api/parse/${data.project}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text: text })
		});
		// response should be XML
		let respText = await parseResponse.text();
		respXML = new DOMParser().parseFromString(respText, 'text/xml');

		console.log('respXML', respXML);
		parseTree = respText;
	}

	let pageStart = Date.now();
	// If passed 1s, update grammarjs
	$: if ((text || grammarjs) && pageStart < Date.now() + 1000) {
		debounce(async () => {
			const ok = await generate();
			if (ok) {
				await parse();
			}
		}, 250);
	}
</script>

<svelte:head>
	<title>{data.project} - Treeplay</title>
</svelte:head>

<div class="h-screen flex flex-col max-h-screen">
	<div class="flex-1 grid-container h-screen">
		<div class="code-editor flex flex-col">
			<Monaco bind:value={grammarjs} bind:markers language="javascript" />
		</div>
		<div class="language-editor flex">
			<Monaco bind:value={text} language="plaintext" />
		</div>
		<div class="generated-tree overflow-scroll variant-glass-surface">
			<Tree xml={respXML} />
		</div>
	</div>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		grid-template-rows: 1fr 1fr;
		row-gap: 1rem;
	}

	.code-editor {
		grid-area: 1 / 1 / 2 / 2;
	}
	.language-editor {
		grid-area: 2 / 1 / 3 / 2;
	}
	.generated-tree {
		grid-area: 1 / 2 / 3 / 3;
	}
</style>
