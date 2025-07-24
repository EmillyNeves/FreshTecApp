# FreshTec Mobile Application - Configuração Local

Este é o aplicativo móvel FreshTec que implementa o sistema "Passaporte do Frescor" com interfaces específicas para Produtor, Transportador, Varejista e Consumidor.

## 🚀 Execução Rápida

Para executar o projeto localmente, você tem algumas opções:

### Opção 1: Comando Simples (Recomendado)
```bash
node start.js
```

### Opção 2: Usando npm (se você configurar manualmente)
Se você quiser usar `npm start`, adicione ao seu `package.json` local:
```json
{
  "scripts": {
    "start": "node start.js"
  }
}
```

Depois execute:
```bash
npm start
```

### Opção 3: Comando direto
```bash
npm run dev
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
3. Execute o projeto:
   ```bash
   node start.js
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