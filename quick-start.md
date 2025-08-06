# FreshTec Mobile - Quick Start

## 🏃‍♂️ Execução Rápida (1 minuto)

### Para Desenvolvimento Local:
```bash
# Opção 1: Mais simples
node start.js

# Opção 2: Com NPM
npm run dev

# Opção 3: Setup automático (primeira vez)
node scripts/setup-local.js
```

### Para Deploy na Vercel:
```bash
# 1. Instalar Vercel CLI (uma vez)
npm install -g vercel

# 2. Deploy automático
node scripts/deploy-vercel.js
```

---

## 🌐 Acesso

- **Local**: http://localhost:5000
- **Vercel**: https://seu-projeto.vercel.app

---

## 🔧 Se algo der errado:

### Erro de dependências:
```bash
npm install
```

### Erro de TypeScript:
```bash
npm run check
```

### Reset completo:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Teste se está tudo OK:
```bash
node scripts/test-build.js
```

---

## 📚 Mais informações:

- **Local**: `README-LOCAL.md`
- **Deploy**: `README-DEPLOY.md`
- **Projeto**: `replit.md`