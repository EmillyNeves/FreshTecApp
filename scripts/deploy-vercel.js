#!/usr/bin/env node

/**
 * Deploy script for Vercel
 * Builds and deploys to Vercel with proper configuration
 */

import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Deploying FreshTec to Vercel...');

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

async function deploy() {
  try {
    // Build first
    console.log('🔨 Building application...');
    await runCommand('node', ['scripts/build-vercel.js']);

    // Deploy to Vercel
    console.log('🚀 Deploying to Vercel...');
    await runCommand('npx', ['vercel', '--prod']);

    console.log('✅ Deployment completed successfully!');
    console.log('🌐 Your app is now live on Vercel!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('💡 Make sure you have vercel CLI installed: npm i -g vercel');
    process.exit(1);
  }
}

deploy();