# FreshTec Mobile Application - Configuração Local

Este é o aplicativo móvel FreshTec que implementa o sistema "Passaporte do Frescor" com interfaces específicas para Produtor, Transportador, Varejista e Consumidor.

## 🚀 Execução Rápida

Para executar o projeto localmente, você tem algumas opções:

### Opção 1: NPM (Mais Compatível) ⭐
```bash
node start-npm.js
```

### Opção 2: Comando Direto
```bash
npm run dev
```

### Opção 3: Script Simples (Alternativa)
```bash
node start-simple.js
```

### Opção 4: Script Original
```bash
node start.js
```

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- As dependências já estão listadas no package.json

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
   
   **Se encontrar erros de TypeScript**, instale as dependências de desenvolvimento:
   ```bash
   npm install --save-dev @types/node @vitejs/plugin-react vite typescript tsx
   ```

3. Execute o projeto (escolha uma opção):
   ```bash
   # Opção mais compatível
   node start-npm.js
   
   # Ou diretamente
   npm run dev
   ```

## 🚨 Solucionando Problemas Comuns

### Erro: "Cannot find type definition file for 'node'"
```bash
npm install --save-dev @types/node
```

### Erro: "Cannot find module 'vite'"
```bash
npm install --save-dev vite @vitejs/plugin-react
```

### Erro: "Cannot find module 'tsx'"
```bash
npm install --save-dev tsx
```

### Reinstalar todas as dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Script automático para corrigir problemas:
```bash
bash fix-local-setup.sh
```

### Problemas com TypeScript Config:
Se o `tsconfig.json` estiver com problemas, use o arquivo alternativo:
```bash
cp tsconfig-local.json tsconfig.json
```

## 🌐 Acesso

Após executar, o aplicativo estará disponível em:
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api

## 📱 Funcionalidades

### Dashboards por Tipo de Usuário
- **Produtor**: Gestão de lotes, alertas de produção
- **Transportador**: Rotas ativas, entregas programadas
- **Varejista**: Estoque, vendas, qualidade
- **Consumidor**: Alimentos monitorados, sustentabilidade

### Funcionalidades Principais
- 🔍 **Scanner QR**: Leitura de Selo de Frescor Digital
- 📦 **Potes Inteligentes**: Monitoramento IoT de alimentos
- 📊 **Analytics**: Métricas de frescor e sustentabilidade
- 📅 **Calendário**: Agendamento e eventos
- ⚙️ **Configurações**: Personalizações por usuário

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Hooks customizados
│   │   └── lib/          # Utilitários
├── server/                # Backend Express
├── shared/                # Tipos e schemas compartilhados
└── start.js              # Script de inicialização local
```

### Comandos Disponíveis
- `node start.js` - Inicia em modo desenvolvimento
- `npm run build` - Build para produção
- `npm run check` - Verificação de tipos TypeScript

## 🔄 Hot Reload

O projeto usa Vite para hot reload automático. Qualquer alteração nos arquivos será refletida automaticamente no navegador.

## 🎯 Modo Guest

O aplicativo suporta modo convidado para demonstração sem necessidade de login.

## 📞 Suporte

Para dúvidas sobre configuração local, consulte os arquivos de documentação do projeto ou entre em contato com a equipe de desenvolvimento.