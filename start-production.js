#!/usr/bin/env node

/**
 * Production start script
 * Starts the built application in production mode
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist', 'index.js');

console.log('🚀 Iniciando FreshTec Mobile em modo produção...');
console.log('📱 Passaporte do Frescor - Production Server');
console.log('');

// Verificar se o build existe
if (!fs.existsSync(distPath)) {
  console.error('❌ Build não encontrado! Execute o build primeiro:');
  console.error('   npm run build');
  console.error('   ou');
  console.error('   node scripts/build-vercel.js');
  process.exit(1);
}

// Configurar variáveis de ambiente para produção
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('🔧 Configurações:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '[CONFIGURED]' : '[NOT SET]'}`);
console.log('');

// Executar o servidor de produção
const serverProcess = spawn('node', [distPath], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

// Gerenciar sinais de sistema
process.on('SIGINT', () => {
  console.log('\n🛑 Parando servidor de produção...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Recebido SIGTERM, parando servidor...');
  serverProcess.kill('SIGTERM');
  process.exit(0);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`❌ Servidor finalizou com código: ${code}`);
  } else {
    console.log('✅ Servidor de produção finalizado com sucesso');
  }
  process.exit(code);
});