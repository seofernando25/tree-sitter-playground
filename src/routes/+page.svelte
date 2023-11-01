<script lang="ts">
	async function create_session() {
		console.log('create_session');
		// GET /api/session
		const res = await fetch('/api/session', {
			method: 'POST'
		});
		// Save the session ID to local storage
		const session_info = await res.json();
		console.log('session_info', session_info);
	}
</script>

<svelte:head>
	<title>Treeplay</title>
</svelte:head>

<button on:click={create_session}>Create Session</button>
