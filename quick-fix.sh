#!/bin/bash

# Script de correção rápida para problemas específicos do usuário
echo "🚀 Correção rápida para problemas de TypeScript..."
echo ""

# Instalar dependências específicas em falta
echo "📦 Instalando dependências em falta..."
npm install --save-dev \
  @types/node \
  @types/react \
  @types/react-dom \
  @vitejs/plugin-react \
  vite \
  typescript \
  tsx

echo ""
echo "🔧 Verificando instalação..."

# Verificar se as dependências foram instaladas
if [ -d "node_modules/@types/node" ]; then
    echo "✅ @types/node instalado"
else
    echo "❌ @types/node não instalado"
fi

if [ -d "node_modules/vite" ]; then
    echo "✅ vite instalado"
else
    echo "❌ vite não instalado"
fi

if [ -d "node_modules/@vitejs/plugin-react" ]; then
    echo "✅ @vitejs/plugin-react instalado"
else
    echo "❌ @vitejs/plugin-react não instalado"
fi

if [ -d "node_modules/tsx" ]; then
    echo "✅ tsx instalado"
else
    echo "❌ tsx não instalado"
fi

echo ""
echo "🔧 Criando backup e usando configurações locais..."
# Fazer backup dos arquivos originais se não existirem
if [ ! -f "vite.config.ts.backup" ]; then
    cp vite.config.ts vite.config.ts.backup
fi

if [ ! -f "tsconfig.json.backup" ]; then
    cp tsconfig.json tsconfig.json.backup
fi

# Usar configurações compatíveis
cp vite.config.local.ts vite.config.ts
cp tsconfig-local.json tsconfig.json

echo "✅ Configurações locais aplicadas"
echo ""
echo "🎯 Agora tente executar (em ordem de preferência):"
echo "  1. node start-local.js    (Configuração local)"
echo "  2. npm run dev            (Direto)"
echo "  3. node start-npm.js      (NPM wrapper)"
echo ""
echo "Para restaurar configurações originais:"
echo "  cp vite.config.ts.backup vite.config.ts"
echo "  cp tsconfig.json.backup tsconfig.json"