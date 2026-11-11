import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express, { Request, Response } from 'express';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import AppServerModule from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const commonEngine = new CommonEngine({
  allowedHosts: ['localhost', '127.0.0.1', 'lukekuenneke.com', 'www.lukekuenneke.com']
});

const COMPRESSIBLE_EXTENSIONS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.txt',
  '.xml',
  '.webmanifest',
  '.svg'
]);
const compressedCache = new Map<string, Buffer>();

function sendCompressed(req: Request, res: Response, raw: Buffer | string, cacheKey?: string): void {
  const acceptEncoding = String(req.headers['accept-encoding'] || '');
  const buffer = typeof raw === 'string' ? Buffer.from(raw, 'utf8') : raw;
  res.setHeader('Vary', 'Accept-Encoding');

  if (acceptEncoding.includes('br')) {
    const key = cacheKey ? `br:${cacheKey}` : undefined;
    let compressed = key ? compressedCache.get(key) : undefined;
    if (!compressed) {
      compressed = brotliCompressSync(buffer);
      if (key) {
        compressedCache.set(key, compressed);
      }
    }
    res.setHeader('Content-Encoding', 'br');
    res.send(compressed);
    return;
  }

  if (acceptEncoding.includes('gzip')) {
    const key = cacheKey ? `gzip:${cacheKey}` : undefined;
    let compressed = key ? compressedCache.get(key) : undefined;
    if (!compressed) {
      compressed = gzipSync(buffer);
      if (key) {
        compressedCache.set(key, compressed);
      }
    }
    res.setHeader('Content-Encoding', 'gzip');
    res.send(compressed);
    return;
  }

  res.send(buffer);
}

let app = express();
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (req.path.startsWith('/.well-known/') || req.path === '/ai-catalog.json' || req.path === '/llms.txt') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  const candidate = resolve(browserDistFolder, '.' + req.path);
  if (!candidate.startsWith(browserDistFolder)) {
    next();
    return;
  }

  let filePath = candidate;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  const ext = extname(filePath).toLowerCase();
  if (COMPRESSIBLE_EXTENSIONS.has(ext) && existsSync(filePath) && statSync(filePath).isFile()) {
    res.type(ext);
    res.setHeader('Cache-Control', ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000');
    sendCompressed(req, res, readFileSync(filePath), filePath);
    return;
  }

  next();
});

app.use(
  express.static(browserDistFolder, {
    dotfiles: 'allow',
    maxAge: '1y',
    index: 'index.html',
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('/{*splat}', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap: AppServerModule,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => {
      res.type('html');
      sendCompressed(req, res, html);
    })
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
