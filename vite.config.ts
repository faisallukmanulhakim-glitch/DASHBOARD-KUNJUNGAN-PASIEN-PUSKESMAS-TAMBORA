import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Memuat env file berdasarkan mode (development/production)
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Mengizinkan penggunaan process.env jika kode lama memerlukannya
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          // KOREKSI: Arahkan ke folder 'src', bukan root '.'
          '@': path.resolve(__dirname, './src'),
        }
      },
      // Tambahkan ini untuk memastikan build Vercel masuk ke folder yang benar
      build: {
        outDir: 'dist',
      }
    };
});
