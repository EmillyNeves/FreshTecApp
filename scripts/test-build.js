#!/usr/bin/env node

/**
 * Test build script - verifies that the build works correctly
 * Tests both client and server builds without deployment
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('🧪 Testando build do FreshTec Mobile...');
console.log('📱 Verificando se tudo está funcionando corretamente');
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

async function checkFile(filePath) {
  try {
    await fs.access(join(rootDir, filePath));
    console.log(`✅ Encontrado: ${filePath}`);
    return true;
  } catch {
    console.log(`❌ Não encontrado: ${filePath}`);
    return false;
  }
}

async function testBuild() {
  try {
    console.log('🔍 Verificando arquivos necessários...');
    
    const requiredFiles = [
      'package.json',
      'vite.config.ts',
      'server/index.ts',
      'client/src/main.tsx',
      'shared/schema.ts'
    ];
    
    let allFilesExist = true;
    for (const file of requiredFiles) {
      const exists = await checkFile(file);
      if (!exists) allFilesExist = false;
    }
    
    if (!allFilesExist) {
      throw new Error('Arquivos essenciais não encontrados');
    }
    
    console.log('');
    console.log('🔨 Iniciando build de teste...');
    
    // Clean dist directory if exists
    try {
      await fs.rm(join(rootDir, 'dist'), { recursive: true, force: true });
      console.log('🧹 Pasta dist limpa');
    } catch {
      console.log('🧹 Pasta dist não existia');
    }
    
    // Build client with Vite
    console.log('');
    console.log('📦 Building client...');
    await runCommand('npx', ['vite', 'build']);
    
    // Build server with esbuild
    console.log('');
    console.log('⚙️  Building server...');
    await runCommand('npx', ['esbuild', 'server/index.ts', 
      '--platform=node', 
      '--packages=external', 
      '--bundle', 
      '--format=esm', 
      '--outdir=dist'
    ]);
    
    console.log('');
    console.log('🔍 Verificando arquivos de build...');
    
    const buildFiles = [
      'dist/public/index.html',
      'dist/public/assets',
      'dist/index.js'
    ];
    
    let allBuildFilesExist = true;
    for (const file of buildFiles) {
      const exists = await checkFile(file);
      if (!exists) allBuildFilesExist = false;
    }
    
    if (!allBuildFilesExist) {
      throw new Error('Build incompleto - arquivos não foram gerados');
    }
    
    console.log('');
    console.log('✅ Build teste completado com sucesso!');
    console.log('🎉 O projeto está pronto para deploy!');
    console.log('');
    console.log('📋 Próximos passos:');
    console.log('   • Para Vercel: node scripts/deploy-vercel.js');
    console.log('   • Para Netlify: npm run deploy:netlify');  
    console.log('   • Para produção local: node start-production.js');
    console.log('');
    
  } catch (error) {
    console.error('❌ Teste de build falhou:', error.message);
    console.log('');
    console.log('🔧 Possíveis soluções:');
    console.log('   • Verificar se todas as dependências estão instaladas: npm install');
    console.log('   • Verificar erros de TypeScript: npm run check');
    console.log('   • Limpar cache: rm -rf node_modules package-lock.json && npm install');
    process.exit(1);
  }
}

testBuild();