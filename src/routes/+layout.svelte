<script lang="ts">
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	// async function get_sessions() {
	// 	console.log('get_sessions');
	// 	// GET /api/session
	// 	const res = await fetch('/api/session');
	// 	// Save the session ID to local storage
	// 	sessions = await res.json();
	// 	console.log('sessions', sessions);
	// }
</script>

<!-- <div class="h-screen flex overflow-hidden bg-gray-100"> -->
<!-- Main content -->
<!-- <main class="flex flex-col flex-1 relative overflow-y-auto focus:outline-none">
		<slot />
	</main>
</div> -->

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div class="h-full flex flex-col w-40 bg-secondarye-500 text-white">
			<div class="flex items-center h-16 px-4">
				<img class="h-8 w-8" src="/favicon.png" alt="Logo" />
				<span class="ml-2 text-2xl font-semibold">Treeplay</span>
			</div>
			<ul class="flex-1 px-2 py-4 overflow-y-auto">
				{#each data.projects as project}
					<li class="truncate break-all p-2 text-sm font-medium rounded-md bg-primary-500">
						<a href="/project/{project}" class="">
							{project}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</svelte:fragment>

	<slot />
</AppShell>
