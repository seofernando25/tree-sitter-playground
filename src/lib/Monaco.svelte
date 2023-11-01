<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	let editorEl: HTMLElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	export let value: string = '';
	export let markers: monaco.editor.IMarker[] = [];
	export let language: string = 'javascript';

	onMount(async () => {
		const tsW = new tsWorker();
		tsW.onmessage = (e) => {
			console.log('tsw:', e);
		};
		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				if (label === 'javascript' || label === 'typescript') {
					return tsW;
				}
				return new editorWorker();
			}
		};

		monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

		editor = monaco.editor.create(editorEl, {
			value: value,
			language,
			theme: 'vs-dark',
			automaticLayout: true
		});
		editor.onDidChangeModelContent(() => {
			console.log('changed');
			value = editor.getValue();
		});

		monaco.editor.onDidChangeMarkers(([uri]) => {
			markers = monaco.editor.getModelMarkers({ resource: uri });
			console.log('markers', markers);
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

	$: if (editor && value && !editor.hasTextFocus()) {
		editor.setValue(value);
	}
</script>

<div bind:this={editorEl} class="flex-1" />
