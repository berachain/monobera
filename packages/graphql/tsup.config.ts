import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', '!src/modules/balancer/*.graphql'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});

