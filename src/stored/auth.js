import { defineStore } from 'pinia';
import { api } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || null, 
    admin: null, 
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, 
  },

  actions: {
    async login(email, senha) {
      const resposta = await api.post('/auth/signin', { email, senha });
      
      this.token = resposta.data.token;
      localStorage.setItem('admin_token', this.token);
      this.admin = resposta.data.user; 
    },

    async signup(nome, email, senha) {
      const resposta = await api.post('/admin/signup', { nome, email, senha });
      
      return resposta.data; 
    },

    logout() {
      this.token = null;
      this.admin = null;
      localStorage.removeItem('admin_token');
    }
  }
});