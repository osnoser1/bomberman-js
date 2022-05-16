import { defineConfig, splitVendorChunkPlugin } from 'vite';

module.exports = defineConfig({
  plugins: [splitVendorChunkPlugin()],
});
