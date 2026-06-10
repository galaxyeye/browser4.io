import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to enable directory listing for the public/ folder
// and case-insensitive URL resolution
function directoryListing() {
    const publicDir = path.resolve(__dirname, 'public');

    // Resolve a path case-insensitively by walking the filesystem
    function resolveCaseInsensitive(targetPath: string): string | null {
        if (fs.existsSync(targetPath)) return targetPath;

        const dir = path.dirname(targetPath);
        const base = path.basename(targetPath).toLowerCase();

        // Walk up until we find an existing directory
        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
            const resolvedDir = resolveCaseInsensitive(dir);
            if (!resolvedDir) return null;
            return resolveCaseInsensitive(path.join(resolvedDir, path.basename(targetPath)));
        }

        const files = fs.readdirSync(dir);
        const match = files.find((f) => f.toLowerCase() === base);
        return match ? path.join(dir, match) : null;
    }

    return {
        name: 'directory-listing',
        configureServer(server: any) {
            // Middleware: case-insensitive URL → real path resolution
            server.middlewares.use((req: any, _res: any, next: any) => {
                const decodedUrl = decodeURIComponent(req.url || '/');
                const requestPath = path.join(publicDir, decodedUrl);
                const resolved = resolveCaseInsensitive(requestPath);
                if (resolved && resolved !== requestPath) {
                    // Rewrite req.url to the real filesystem path relative to publicDir
                    req.url = path.relative(publicDir, resolved).replace(/\\/g, '/');
                    if (!req.url.startsWith('/')) req.url = '/' + req.url;
                }
                next();
            });

            // Middleware: directory listing
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
