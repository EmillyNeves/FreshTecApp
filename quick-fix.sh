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
echo "🎯 Agora tente executar:"
echo "  node start.js"
echo ""
echo "Se ainda houver problemas com TypeScript:"
echo "  cp tsconfig-local.json tsconfig.json"