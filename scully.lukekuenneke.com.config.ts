import { ScullyConfig } from '@scullyio/scully';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';

const process = require('process');
process.env.CHROMIUM_PATH = require('puppeteer').executablePath();

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "lukekuenneke.com",
  outDir: './dist/static',
  defaultPostRenderers: ['seoHrefOptimise'],
  routes: {
    '/resume': {
      type: "ignored"
    }
  },
  puppeteerLaunchOptions: {
    executablePath: process.env.CHROMIUM_PATH,
    args: [
      "--disable-gpu",
      "--renderer",
      "--no-sandbox",
      "--no-service-autorun",
      "--no-experiments",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-extensions"
    ]
  }
};