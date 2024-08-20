import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { 
    outDir: 'build', // Specify the output directory here
    rollupOptions: {
      output: {
        // This configuration will create separate chunks for each of your dependencies, which can significantly reduce the size of your main chunk.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },  
});
