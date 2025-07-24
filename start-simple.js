#!/usr/bin/env node

/**
 * Script de inicialização SIMPLES para desenvolvimento local
 * Não requer tsx - usa Node.js com compilação em tempo real
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando FreshTec Mobile Application (Modo Simples)...');
console.log('📱 Aplicativo Passaporte do Frescor');
console.log('');

// Configurar variáveis de ambiente para desenvolvimento
process.env.NODE_ENV = 'development';

console.log('⚙️  Compilando TypeScript e iniciando servidor...');

// Usar node com registro TypeScript
const serverProcess = spawn('node', [
  '--experimental-loader', '@babel/register',
  'server/index.ts'
], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    TS_NODE_PROJECT: './tsconfig.json'
  }
});

// Gerenciar sinais de sistema
process.on('SIGINT', () => {
  console.log('\n🛑 Parando servidor...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  serverProcess.kill('SIGTERM');
  process.exit(0);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`❌ Servidor finalizou com código: ${code}`);
    console.log('');
    console.log('💡 Sugestões:');
    console.log('   1. Execute: bash quick-fix.sh');
    console.log('   2. Verifique se todas as dependências estão instaladas');
    console.log('   3. Use: npm run dev (como alternativa)');
  } else {
    console.log('✅ Servidor finalizado com sucesso');
  }
  process.exit(code);
});