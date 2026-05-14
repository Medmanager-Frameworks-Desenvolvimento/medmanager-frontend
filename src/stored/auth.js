import { defineStore } from 'pinia';
import { api } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || null, 
    admin: JSON.parse(localStorage.getItem('admin_user')) || null, 
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, 
  },

  actions: {
    async login(email, senha) {
      const resposta = await api.post('/auth/signin', { email, senha });
      
      this.token = resposta.data.token;
      this.admin = resposta.data.user; 

      localStorage.setItem('admin_token', this.token);
      localStorage.setItem('admin_user', JSON.stringify(this.admin)); 
    },

    async signup(nome, email, senha) {
      const resposta = await api.post('/admin/signup', { nome, email, senha });
      return resposta.data; 
    },

    logout() {
      this.token = null;
      this.admin = null;
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  }
});