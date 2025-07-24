#!/usr/bin/env node

/**
 * Script de inicialização simples para desenvolvimento local
 * Execute com: node start.js ou npm start (se configurado)
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando FreshTec Mobile Application...');
console.log('📱 Aplicativo Passaporte do Frescor');
console.log('');

// Configurar variáveis de ambiente para desenvolvimento
process.env.NODE_ENV = 'development';

// Executar o servidor
const serverProcess = spawn('tsx', ['server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
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
  } else {
    console.log('✅ Servidor finalizado com sucesso');
  }
  process.exit(code);
});