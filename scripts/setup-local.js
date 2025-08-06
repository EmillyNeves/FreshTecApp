#!/usr/bin/env node

/**
 * Setup script for local development
 * Configures the environment for local development
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('🔧 Configurando ambiente local do FreshTec Mobile...');
console.log('📱 Passaporte do Frescor - Setup Local');
console.log('');

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Executando: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      cwd: rootDir,
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

async function copyFileIfExists(source, dest) {
  try {
    await fs.access(join(rootDir, source));
    await fs.copyFile(join(rootDir, source), join(rootDir, dest));
    console.log(`✅ Copiado: ${source} → ${dest}`);
  } catch (error) {
    console.log(`⚠️  Arquivo não encontrado: ${source}`);
  }
}

async function createFileIfNotExists(filePath, content) {
  const fullPath = join(rootDir, filePath);
  try {
    await fs.access(fullPath);
    console.log(`✅ Já existe: ${filePath}`);
  } catch (error) {
    await fs.writeFile(fullPath, content);
    console.log(`✅ Criado: ${filePath}`);
  }
}

async function setup() {
  try {
    console.log('📦 Verificando dependências...');
    
    // Check if node_modules exists
    try {
      await fs.access(join(rootDir, 'node_modules'));
      console.log('✅ node_modules encontrado');
    } catch {
      console.log('📦 Instalando dependências...');
      await runCommand('npm', ['install']);
    }

    console.log('');
    console.log('🔧 Configurando arquivos...');

    // Copy local configuration files if they exist
    await copyFileIfExists('vite.config.local.ts', 'vite.config.local.ts');
    await copyFileIfExists('tsconfig-local.json', 'tsconfig-local.json');
    
    // Create .env file from example if it doesn't exist
    await createFileIfNotExists('.env', `# FreshTec Mobile - Local Development
NODE_ENV=development
PORT=5000
STORAGE_TYPE=memory
SESSION_SECRET=local_development_secret
LOG_LEVEL=info
`);

    // Create local package.json script if needed
    const localPackageContent = `{
  "name": "freshtec-mobile-local",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node start.js",
    "dev": "node start.js",
    "build": "node scripts/build-vercel.js",
    "prod": "node start-production.js"
  }
}`;
    
    await createFileIfNotExists('package-local.json', localPackageContent);

    console.log('');
    console.log('✅ Configuração local completa!');
    console.log('');
    console.log('🚀 Para iniciar o desenvolvimento:');
    console.log('   node start.js');
    console.log('   ou');
    console.log('   npm run dev');
    console.log('');
    console.log('🌐 O aplicativo estará em: http://localhost:5000');
    console.log('');

  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    process.exit(1);
  }
}

setup();