#!/usr/bin/env node

/**
 * Build script for Netlify deployment
 * Builds client, server, and Netlify functions
 */

import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🔨 Building FreshTec for Netlify deployment...');

// Set production environment
process.env.NODE_ENV = 'production';

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function build() {
  try {
    // Build client with Vite
    console.log('📦 Building client...');
    await runCommand('npx', ['vite', 'build']);

    // Build server with esbuild
    console.log('⚙️  Building server...');
    await runCommand('npx', ['esbuild', 'server/index.ts', 
      '--platform=node', 
      '--packages=external', 
      '--bundle', 
      '--format=esm', 
      '--outdir=dist'
    ]);

    // Build Netlify functions
    console.log('🔧 Building Netlify functions...');
    await runCommand('npx', ['esbuild', 'netlify/functions/server.ts',
      '--platform=node',
      '--packages=external',
      '--bundle',
      '--format=esm',
      '--outdir=netlify/functions'
    ]);

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();