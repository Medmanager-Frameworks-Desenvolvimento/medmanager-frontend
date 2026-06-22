# 🧓💊 MedManager - Frontend

O MedManager é um sistema desenvolvido para otimizar o gerenciamento de pacientes idosos, permitindo o controle de prescrições médicas, administração de medicamentos e acompanhamento por enfermeiros.

Este repositório contém a aplicação client-side responsável por fornecer a interface gráfica, painéis de controle e a experiência interativa dos usuários em tempo real.

<br>

## ⚙️ Funcionalidades

- **Autenticação e Proteção de Rotas**: Tela de login integrada ao controle de acesso seguro, utilizando guards de navegação para impedir o acesso a rotas protegidas por usuários não autenticados.

- **Painel de Indicadores (Dashboard)**: Exibição gráfica e intuitiva de métricas do sistema, incluindo o quantitativo de pacientes e medicamentos, além de gráficos de distribuição de prescrições por turno e prevalência de doenças crônicas.

- **Gerenciamento semântico de entidades (CRUDs)**: Interfaces completas para cadastrar, visualizar, editar e remover pacientes, enfermeiros e medicamentos, com validações de campos obrigatórios diretamente na interface.

- **Listagem Avançada de Prescrições**: Exibição das prescrições médicas em formato de cards responsivos, contando com paginação dinâmica, barra de busca textual e filtros rápidos por turno de atendimento.

- **Confirmação de Medicação Administrada**: Modal específico de visualização que permite ao profissional de saúde registrar se o paciente tomou ou não o medicamento, atualizando o status visual do card e do banco de dados imediatamente.

- **Alertas e Notificações em Tempo Real**: Sistema reativo de *push notifications* integrado ao sininho do cabeçalho e exibição de componentes flutuantes (*toasts*), disparados instantaneamente no exato minuto em que uma medicação é considerada atrasada.

<br>

## 💻 Tecnologias Utilizadas

- **Vue.js (v3)**: Framework para a construção da interface, utilizando a Composition API (`<script setup>`) para maior reusabilidade e organização do código.

- **Vite**: Ferramenta de build que provê um ambiente de desenvolvimento rápido e empacotamento otimizado.

- **Pinia**: Store de gerenciamento de estado global, utilizada para centralizar o fluxo de autenticação do administrador e o ciclo de vida das notificações ativas.

- **Vue Router**: Roteador oficial do Vue para a criação de uma Single Page Application (SPA), controlando o histórico de navegação e as travas de segurança.

- **Tailwind CSS**: Framework CSS aplicado para a construção de um design moderno, responsivo, limpo e totalmente customizado.

- **Socket.IO Client**: Biblioteca para estabelecer a comunicação bidirecional via WebSockets com o servidor, permitindo a escuta ativa de eventos de atraso sem a necessidade de requisições contínuas.

- **Axios**: Biblioteca utilizada para consumo de APIs externas e requisições HTTP.

- **Lucide Vue Next**: Coleção de ícones integrados de forma nativa aos botões, modais e menus da aplicação.

<br>

## 🚀 Como testar localmente

- Clone o repositório utilizando o comando:
```bash
git clone https://github.com/Medmanager-Frameworks-Desenvolvimento/medmanager-frontend.git
```

- Acesse o diretório do projeto:
```bash
cd medmanager-frontend
```

- Instale as dependências do projeto:
```bash
npm install
```

- Inicie o servidor de desenvolvimento local:
```bash
npm run dev
```

- Abra o navegador e acesse o endereço local indicado pelo Vite
- Para utilizar a aplicação completa, acesse também o repositório do back-end: [MedManager Backend](https://github.com/Medmanager-Frameworks-Desenvolvimento/medmanager-backend)

<br>

## 📁 Estrutura do Projeto

```
medmanager-frontend
│
│── src                   
│ │── components/         # Componentes modulares e reutilizáveis
│ │ │── auth/             # Componentes específicos das telas de acesso
│ │ │ ├── BaseButton.vue
│ │ │ ├── BaseInput.vue
│ │ │── common/           # Componentes genéricos e modais globais do sistema
│ │ │ ├── BaseAlert.vue
│ │ │ ├── BaseModal.vue
│ │ │ ├── ConfirmModal.vue
│ │ │ ├── DataTable.vue
│ │ │ ├── DeletedModal.vue
│ │ │ ├── LogoutModal.vue
│ │ │ ├── NotificationsModal.vue  # Modal de gerenciamento de atrasos
│ │ │ ├── NotificationToast.vue   # Alerta flutuante (toast) em tempo real
│ │ │ ├── PrimaryButton.vue
│ │ │ ├── SuccessModal.vue
│ │ │ ├── TableActions.vue
│ │ │── dashboard/        # Componentes visuais do painel de indicadores
│ │ │ ├── ChartCard.vue
│ │ │ ├── StatCard.vue
│ │ │── prescriptions/    # Componentes de domínio específico
│ │ │ ├── PrescriptionModal.vue
│ │
│ │── layouts/            # Estruturas base de renderização das páginas
│ │ │── auth/
│ │ │ ├── AuthLayout.vue  # Molde das telas de login e cadastro
│ │ │── Header.vue        # Cabeçalho com o sininho de notificações dinâmico
│ │ │── MainLayout.vue    # Layout principal com a barra lateral embutida
│ │ │── Sidebar.vue       # Menu principal de navegação do sistema
│ │
│ │── router/             # Configuração e proteção de navegação
│ │ │── index.js          # Instância do Vue Router e guards de autenticação
│ │ │── routes.js         # Mapeamento de todas as rotas/URLs da aplicação
│ │
│ │── services/           # Integração com o Back-end via Axios
│ │ │── api.js            # Instância base do Axios com interceptors de token
│ │ │── enfermeiros.js
│ │ │── medicamentos.js
│ │ │── pacientes.js
│ │ │── prescricoes.js
│ │
│ │── stored/             # Gerenciamento de estado global da aplicação (Pinia)
│ │ │── auth.js           # Estado do administrador logado
│ │ │── notifications.js  # Gerenciamento das conexões WebSocket e alertas
│ │
│ │── views/              # Páginas completas (renderizadas pelo router)
│ │ │── auth/
│ │ │ ├── CadastroView.vue
│ │ │ ├── LoginView.vue
│ │ │── dashboard/
│ │ │ ├── DashboardView.vue
│ │ │── medications/      # CRUD de Medicamentos
│ │ │ ├── AddMedicamentosView.vue
│ │ │ ├── EditarMedicamentoView.vue
│ │ │ ├── MedicamentosView.vue
│ │ │── nurses/           # CRUD de Enfermeiros
│ │ │ ├── AddEnfermeirosView.vue
│ │ │ ├── EditarEnfermeiroView.vue
│ │ │ ├── EnfermeirosView.vue
│ │ │── patients/         # CRUD de Pacientes
│ │ │ ├── AddPacientesView.vue
│ │ │ ├── EditarPacienteView.vue
│ │ │ ├── PacientesView.vue
│ │ │── prescriptions/    # Gerenciamento de Prescrições
│ │ │ ├── AddPrescricaoView.vue
│ │ │ ├── EditarPrescricaoView.vue
│ │ │ ├── PrescricoesView.vue
│ │ │── settings/
│ │ │ ├── ConfigView.vue
│ │
│ │── App.vue             # Componente raiz do Vue
│ │── index.css           # Estilos base e diretivas do Tailwind CSS
│ │── main.js             # Ponto de entrada que inicializa o Vue, Pinia e Router
│ │── style.css           # Folha de estilo adicional (geral)
│
│── .gitignore            
│── index.html            # Template HTML principal da SPA
│── package-lock.json     
│── package.json          
│── postcss.config.js    
│── README.md             
│── tailwind.config.js    
│── vite.config.js        
```

<br>

## 👩🏻‍💻 Autoras

#### [Elis Vieira Weiss](https://github.com/elisvw)
#### [Sarah Alves Borges](https://github.com/sarahzxwy)