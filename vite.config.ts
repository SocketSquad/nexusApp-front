import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'istanbul', // or 'c8'
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage'
        },
    },
});