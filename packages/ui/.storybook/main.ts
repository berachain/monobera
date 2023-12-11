import type { StorybookConfig } from "@storybook/react-vite";

const viteTsconfig = require("vite-tsconfig-paths");
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require("vite");

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-styling",
			options: {
				postCss: true,
			},
		},
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [tsconfigPaths()],
		});
	},
};
export default config;
