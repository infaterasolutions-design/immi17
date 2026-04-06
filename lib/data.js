// ── ES6 module re-export of data for Next.js SSR pages ──
// The original data.js uses window globals for the browser SPA.
// This file provides the same data as ES6 exports for server-side use.

// We dynamically read the data.js file and extract the objects
// Since data.js uses template literals and window globals that can't run on server,
// we maintain a simplified reference here.

// For SSR pages, import from this file: import { NewsData } from '../lib/data'

let AdminConfig, NewsData, LiveUpdatesData;

if (typeof window === 'undefined') {
  // Server-side: Safely require Node modules hiding them from Webpack static analysis
  // Webpack uses static analysis, so eval prevents 'Module not found' errors on client builds.
  const fs = eval("require('fs')");
  const path = eval("require('path')");
  const vm = eval("require('vm')");

  const dataPath = path.join(process.cwd(), 'public', 'data.js');
  const code = fs.readFileSync(dataPath, 'utf-8');
  
  // Create a sandboxed context with a fake window object
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  
  AdminConfig = sandbox.window.AdminConfig;
  NewsData = sandbox.window.NewsData;
  LiveUpdatesData = sandbox.window.LiveUpdatesData;
} else {
  // Client-side: use the global window objects loaded by the script tag
  AdminConfig = window.AdminConfig || {};
  NewsData = window.NewsData || [];
  LiveUpdatesData = window.LiveUpdatesData || [];
}

module.exports = {
  AdminConfig,
  NewsData,
  LiveUpdatesData,
};
