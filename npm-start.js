#!/usr/bin/env node

/**
 * NPM Start compatibility script
 * This script can be used with `npm start` if configured in package.json
 * It provides a simple entry point for local development
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 FreshTec Mobile - Starting Development Server');
console.log('📱 Passaporte do Frescor');
console.log('');
console.log('🔗 Access: http://localhost:5000');
console.log('');

// Use the main start script
const startScript = join(__dirname, 'start.js');

const serverProcess = spawn('node', [startScript], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

// Handle signals
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping development server...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  serverProcess.kill('SIGTERM');
  process.exit(0);
});

serverProcess.on('exit', (code) => {
  process.exit(code);
});