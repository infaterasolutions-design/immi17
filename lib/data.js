// ── ES6 module re-export of data for Next.js SSR pages ──
// The original data.js uses window globals for the browser SPA.
// This file provides the same data as ES6 exports for server-side use.

// We dynamically read the data.js file and extract the objects
// Since data.js uses template literals and window globals that can't run on server,
// we maintain a simplified reference here.

// For SSR pages, import from this file: import { NewsData } from '../lib/data'

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadData() {
  const dataPath = path.join(process.cwd(), 'public', 'data.js');
  const code = fs.readFileSync(dataPath, 'utf-8');
  
  // Create a sandboxed context with a fake window object
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  
  return {
    AdminConfig: sandbox.window.AdminConfig,
    NewsData: sandbox.window.NewsData,
    LiveUpdatesData: sandbox.window.LiveUpdatesData,
  };
}

const data = loadData();

module.exports = {
  AdminConfig: data.AdminConfig,
  NewsData: data.NewsData,
  LiveUpdatesData: data.LiveUpdatesData,
};
