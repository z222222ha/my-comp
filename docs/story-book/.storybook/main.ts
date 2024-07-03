import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config, { configType }) {
    if (configType === "PRODUCTION") {
      config.esbuild = {
        drop: ["console", "debugger"],
      };
    }
    if (configType === "DEVELOPMENT") {
      // Your development configuration goes here
    }
    return config;
  },
};

export default config;
