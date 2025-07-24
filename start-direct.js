#!/usr/bin/env node

/**
 * Script de inicialização direta sem Vite
 * Executa apenas o servidor Express para desenvolvimento local
 */

import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando FreshTec (Modo Direto)...');
console.log('📱 Aplicativo Passaporte do Frescor');
console.log('⚡ Executando apenas servidor Express (sem Vite)');
console.log('');

// Configurar variáveis de ambiente
process.env.NODE_ENV = 'development';

// Executar apenas o servidor Express com tsx
const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    // Desabilitar Vite para evitar problemas de configuração
    DISABLE_VITE: 'true'
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
    console.log('💡 Servidor Express pode estar funcionando em http://localhost:5000');
    console.log('   Mesmo com erro, verifique se a aplicação carregou');
  } else {
    console.log('✅ Servidor finalizado com sucesso');
  }
  process.exit(code);
});