<script lang="ts">
	import { browser } from '$app/environment';
	import {
		TreeView,
		TreeViewItem,
		RecursiveTreeView,
		type TreeViewNode
	} from '@skeletonlabs/skeleton';
	import exp from 'constants';
	import { onMount } from 'svelte';

	export let xml: Document;
	let expanded: string[] = [];

	$: if (expanded.length > 0) {
		console.log('expanded', expanded);
	}
	$: if (xml && browser) {
		console.log('rebuilding tree');
		rebuildTree();
	}

	let id = 0;
	function rebuildTree() {
		id = 0;
		expanded = [];
		const firstChild = xml.firstChild;
		if (!firstChild) return;

		tree = [
			{
				id: (id++).toString(),
				// If node has children, content is empty
				content:
					(xml.firstChild?.childNodes?.length ?? 0) > 0 ? '' : xml.firstChild?.textContent ?? '',
				lead: xml.firstChild?.nodeName,
				children: [
					//...
				]
			}
		];
		traverse(firstChild, tree[0]);
		// Expand all nodes
		// if id = 6, then expanded is [0, 1, 2, 3, 4, 5]
		expanded = Array.from(Array(id).keys()).map((i) => i.toString());
	}

	let tree: TreeViewNode[] = [];

	function traverse(node: Node, parent: TreeViewNode) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			let element = node as Element;
			let children = element.children;
			let childNodes: TreeViewNode[] = [];
			for (let i = 0; i < children.length; i++) {
				let child = children[i];
				let childNode: TreeViewNode = {
					id: (id++).toString(),
					content:
						(child.firstChild?.childNodes?.length ?? 0) > 0
							? ''
							: child.firstChild?.textContent ?? '',
					lead: child.nodeName,
					children: []
				};
				traverse(child, childNode);
				childNodes.push(childNode);
			}
			parent.children = childNodes;
		}
	}
</script>

<RecursiveTreeView nodes={tree} bind:expandedNodes={expanded} />
