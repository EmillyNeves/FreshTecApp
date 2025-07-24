#!/bin/bash

# Script para resolver problemas comuns de configuração local
echo "🔧 Corrigindo problemas de configuração local..."
echo ""

# Limpar cache npm
echo "🧹 Limpando cache npm..."
npm cache clean --force

# Remover node_modules e package-lock.json
if [ -d "node_modules" ]; then
    echo "🗑️  Removendo node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    echo "🗑️  Removendo package-lock.json..."
    rm -f package-lock.json
fi

# Reinstalar dependências
echo "📦 Reinstalando todas as dependências..."
npm install

# Instalar dependências críticas para desenvolvimento
echo "🔧 Instalando dependências de desenvolvimento críticas..."
npm install --save-dev \
    @types/node \
    @types/react \
    @types/react-dom \
    @types/express \
    @types/express-session \
    @types/passport \
    @types/passport-local \
    @types/ws \
    @types/connect-pg-simple \
    @vitejs/plugin-react \
    vite \
    typescript \
    tsx \
    tailwindcss \
    autoprefixer \
    postcss \
    drizzle-kit \
    esbuild

echo ""
echo "✅ Configuração local corrigida!"
echo ""
echo "Para executar o projeto:"
echo "  node start.js"
echo ""
echo "Se ainda houver problemas, verifique se você tem:"
echo "  - Node.js 18+ instalado"
echo "  - npm 8+ instalado"
echo "  - Permissões de escrita na pasta do projeto"