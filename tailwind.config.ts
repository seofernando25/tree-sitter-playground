import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: {
				preset: [
					// Enable 'enhancements' per each registered theme:
					{ name: 'skeleton', enhancements: true }
				]
			}
		})
	]
} satisfies Config;

export default config;
