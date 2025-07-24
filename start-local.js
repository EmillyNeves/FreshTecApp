#!/usr/bin/env node

/**
 * Script de inicialização específico para ambiente local
 * Usa configuração compatível com Node.js 18
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando FreshTec Mobile Application (Local)...');
console.log('📱 Aplicativo Passaporte do Frescor');
console.log('');

// Configurar variáveis de ambiente para desenvolvimento local
process.env.NODE_ENV = 'development';
process.env.VITE_CONFIG = './vite.config.local.ts';

// Verificar se a configuração local existe
const localConfig = join(__dirname, 'vite.config.local.ts');
if (!existsSync(localConfig)) {
  console.log('❌ Arquivo vite.config.local.ts não encontrado');
  console.log('💡 Execute bash quick-fix.sh para gerar os arquivos necessários');
  process.exit(1);
}

console.log('⚙️  Usando configuração local do Vite...');

// Executar tsx com configuração local
const serverProcess = spawn('npx', ['tsx', '--tsconfig', './tsconfig-local.json', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    VITE_CONFIG_PATH: localConfig
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
    console.log('💡 Tente:');
    console.log('   1. cp vite.config.local.ts vite.config.ts');
    console.log('   2. cp tsconfig-local.json tsconfig.json');
    console.log('   3. npm run dev');
  } else {
    console.log('✅ Servidor finalizado com sucesso');
  }
  process.exit(code);
});