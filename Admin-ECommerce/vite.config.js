import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-styled-components", {
            "displayName": true,// false: Turn off class names based on component names for production
            "fileName": true,  // false: Removes the file name from the class name in production
            "minify": false,   // true: Minifies the styles in production
            "pure": false       // true: Marks styled components as pure for dead code elimination            
          }]
        ]
      }    
    }),
    // eslintPlugin()  // Add this line to include the ESLint plugin
  ],
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
      plugins: [
        {
          name: 'polyfill-node-crypto',
          resolveId(source) {
            return source === 'crypto' ? 'crypto-browserify' : null;
          }
        }
      ]      
    },
  }, 
  server: {
    host: 'localhost',
    port: parseInt(process.env.VITE_DEVELOPING_FRONTEND_PORT) || 3001,
    open: true  // Optional: Automatically open the browser when the server starts
  }       
});
