import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to enable directory listing for the public/ folder
function directoryListing() {
    const publicDir = path.resolve(__dirname, 'public');
    return {
        name: 'directory-listing',
        configureServer(server: any) {
            server.middlewares.use((req: any, res: any, next: any) => {
                const requestPath = path.join(publicDir, req.url || '/');
                if (
                    fs.existsSync(requestPath) &&
                    fs.statSync(requestPath).isDirectory()
                ) {
                    const files = fs.readdirSync(requestPath);
                    const parent =
                        req.url !== '/'
                            ? `<li><a href="${path.dirname(req.url)}">..</a></li>`
                            : '';
                    const list = files
                        .map(
                            (f) =>
                                `<li><a href="${path.join(req.url || '/', f)}">${f}</a></li>`,
                        )
                        .join('');
                    res.setHeader('Content-Type', 'text/html');
                    res.end(
                        `<html><body><h1>Index of ${req.url}</h1><ul>${parent}${list}</ul></body></html>`,
                    );
                    return;
                }
                next();
            });
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), directoryListing()],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    server: {
        fs: {
            strict: false,
        },
    },
});
