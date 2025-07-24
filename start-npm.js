#!/usr/bin/env node

/**
 * Script de inicialização usando NPM
 * Executa o comando npm run dev diretamente
 */

import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando FreshTec via NPM...');
console.log('📱 Aplicativo Passaporte do Frescor');
console.log('');

// Configurar variáveis de ambiente
process.env.NODE_ENV = 'development';

// Executar npm run dev
const serverProcess = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
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