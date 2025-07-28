import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

const server = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

server.set('view engine', 'html');
server.set('views', browserDistFolder);

server.get('/favicon.ico', express.static(join(browserDistFolder, 'favicon.ico')));

server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

server.get('*', (req, res) => {
  res.sendFile(join(browserDistFolder, 'index.html'));
});

const port = process.env['PORT'] || 4000;

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});