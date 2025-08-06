#!/bin/bash

# FreshTec Mobile - Simple Start Script
# Execução simples do projeto em modo desenvolvimento

echo "🚀 FreshTec Mobile - Starting Development"
echo "📱 Passaporte do Frescor"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor instale Node.js 18+ primeiro."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "🔗 Aplicação será aberta em: http://localhost:5000"
echo ""

# Start the application
node start.js