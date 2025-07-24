#!/bin/bash

# Script de configuração local para FreshTec Mobile Application
# Execute com: bash local-setup.sh

echo "🚀 Configurando FreshTec Mobile Application para desenvolvimento local..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js versão $NODE_VERSION encontrada. Recomendamos versão 18 ou superior."
    echo "   Visite: https://nodejs.org/"
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale npm primeiro."
    exit 1
fi

echo "✅ Node.js $(node -v) e npm $(npm -v) detectados"
echo ""

# Instalar dependências se não existirem
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas com sucesso"
else
    echo "✅ Dependências já instaladas"
fi

# Verificar se as dependências críticas estão instaladas
echo "🔍 Verificando dependências críticas..."

MISSING_DEPS=""

if [ ! -d "node_modules/@types/node" ]; then
    MISSING_DEPS="$MISSING_DEPS @types/node"
fi

if [ ! -d "node_modules/vite" ]; then
    MISSING_DEPS="$MISSING_DEPS vite"
fi

if [ ! -d "node_modules/@vitejs/plugin-react" ]; then
    MISSING_DEPS="$MISSING_DEPS @vitejs/plugin-react"
fi

if [ ! -d "node_modules/tsx" ]; then
    MISSING_DEPS="$MISSING_DEPS tsx"
fi

if [ ! -z "$MISSING_DEPS" ]; then
    echo "⚠️  Instalando dependências em falta:$MISSING_DEPS"
    npm install --save-dev $MISSING_DEPS
    echo "✅ Dependências críticas instaladas"
fi

echo ""
echo "🎯 Configuração completa!"
echo ""
echo "Para executar o projeto:"
echo "  🟢 Opção 1: node start.js"
echo "  🟢 Opção 2: npm run dev"
echo ""
echo "Acesse em: http://localhost:5000"
echo ""
echo "📱 FreshTec - Passaporte do Frescor"
echo "   Sistema completo de rastreabilidade alimentar"