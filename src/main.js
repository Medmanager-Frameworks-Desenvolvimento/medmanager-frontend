import { createApp } from 'vue'
import { createPinia } from 'pinia' // <-- Importa o Pinia
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
const pinia = createPinia() // <-- Cria a instância do Pinia

app.use(pinia) // <-- Avisa o Vue para usar o Pinia
app.use(router)
app.mount('#app')
