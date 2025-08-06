# FreshTec Mobile - Guia de Deploy

Este guia contém todas as instruções para fazer deploy da aplicação FreshTec Mobile nas principais plataformas de hosting.

## 🚀 Plataformas Suportadas

### 1. Vercel (Recomendado)
### 2. Netlify
### 3. Docker
### 4. Servidor próprio

---

## 🌐 Deploy na Vercel

A Vercel é a plataforma recomendada por sua simplicidade e integração nativa com Node.js.

### Pré-requisitos
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login na Vercel
vercel login
```

### Deploy Automático
```bash
# Build e deploy em um comando
node scripts/deploy-vercel.js
```

### Deploy Manual
```bash
# 1. Build da aplicação
node scripts/build-vercel.js

# 2. Deploy para Vercel
vercel --prod
```

### Configuração de Ambiente
No painel da Vercel, configure estas variáveis de ambiente:

```env
NODE_ENV=production
DATABASE_URL=sua_string_de_conexao_postgresql
PORT=5000
```

---

## 📡 Deploy no Netlify

### Pré-requisitos
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer login no Netlify
netlify login

# Conectar o projeto
netlify init
```

### Deploy Automático
```bash
# Build e deploy
npm run deploy:netlify
```

### Deploy Manual
```bash
# 1. Build da aplicação
node scripts/build-netlify.js

# 2. Deploy para Netlify
netlify deploy --prod
```

---

## 🐳 Deploy com Docker

### Build da Imagem
```bash
# Build da imagem Docker
docker build -t freshtec-mobile .

# Executar localmente
docker run -p 5000:5000 freshtec-mobile
```

### Deploy em Produção
```bash
# Com variáveis de ambiente
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=sua_string_de_conexao \
  freshtec-mobile
```

### Docker Compose
Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/freshtec
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=freshtec
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 🖥️ Deploy em Servidor Próprio

### Preparar Servidor
```bash
# Instalar Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para gerenciamento de processo
npm install -g pm2
```

### Deploy da Aplicação
```bash
# 1. Clone o repositório
git clone seu-repositorio
cd freshtec-mobile

# 2. Instalar dependências
npm install

# 3. Build para produção
npm run build

# 4. Configurar variáveis de ambiente
echo "NODE_ENV=production" > .env
echo "DATABASE_URL=sua_string_de_conexao" >> .env
echo "PORT=5000" >> .env

# 5. Iniciar com PM2
pm2 start dist/index.js --name "freshtec-mobile"
pm2 startup
pm2 save
```

### Configurar Nginx (Opcional)
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Variáveis de Ambiente

### Obrigatórias
```env
NODE_ENV=production
PORT=5000
```

### Para Banco de Dados PostgreSQL
```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### Para Banco de Dados Local (Desenvolvimento)
```env
NODE_ENV=development
```

---

## 📊 Monitoramento

### Logs da Aplicação
```bash
# Vercel
vercel logs

# Netlify
netlify logs

# Docker
docker logs container-name

# PM2
pm2 logs freshtec-mobile
```

### Health Check
A aplicação responde em:
- `GET /` - Interface do usuário
- `GET /api` - Status da API

---

## 🔍 Resolução de Problemas

### Erro: "Cannot find module"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Verificar processo usando a porta
lsof -i :5000

# Matar processo se necessário
kill -9 PID
```

### Erro: Database Connection
1. Verifique se a string de conexão está correta
2. Confirme se o banco está acessível
3. Verifique as credenciais

### Build Failures
```bash
# Limpar cache e rebuildar
npm run clean
rm -rf dist
npm run build
```

---

## 🚀 Scripts Úteis

### Todos os comandos disponíveis:
```bash
# Desenvolvimento local
npm run dev
node start.js

# Build para produção
node scripts/build-vercel.js    # Vercel
node scripts/build-netlify.js   # Netlify

# Deploy
node scripts/deploy-vercel.js   # Vercel automático
npm run deploy:netlify          # Netlify automático

# Docker
npm run docker:build           # Build imagem
npm run docker:run            # Executar container

# Utilitários
npm run check                 # Verificação TypeScript
npm run db:push              # Migração banco
```

---

## 📞 Suporte

Para problemas específicos de deploy:

1. **Vercel**: Verifique os logs no painel da Vercel
2. **Netlify**: Use `netlify logs` para ver erros
3. **Docker**: Verifique `docker logs`
4. **Servidor**: Use `pm2 logs` ou `journalctl`

Para mais detalhes, consulte a documentação do projeto em `replit.md`.