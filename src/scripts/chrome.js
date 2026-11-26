/**
 * What the scripts that look at the demos in a real browser share: a local
 * server of the website and a headless Chrome.
 *
 * Set CHROME_PATH if Chrome is not in a usual place.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { createServer } from 'vite';

/** Resolves to `{address, close}`. Needs "npm run runsuite" to be done before */
export async function serveWebsite() {
  const server = await createServer({ root: fileURLToPath(new URL('..', import.meta.url)), logLevel: 'error' });
  await server.listen();
  return { address: server.resolvedUrls.local[0], close: () => server.close() };
}

/**
 * Open one demo per browser: a demo in a background tab gets no animation
 * frames, and a library that draws on them looks slower than it is.
 */
export function launchChrome() {
  return puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    // WebGL libraries should draw with the real GPU when there is one
    args: ['--enable-gpu', '--ignore-gpu-blocklist', ...(process.platform === 'darwin' ? ['--use-angle=metal'] : [])]
  });
}

function findChrome() {
  const chrome = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  ].find(path => path && existsSync(path));
  if (!chrome) throw new Error('Chrome is not found, set CHROME_PATH to its executable');
  return chrome;
}
