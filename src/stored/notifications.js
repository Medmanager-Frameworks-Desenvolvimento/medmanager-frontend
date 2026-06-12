import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { io } from 'socket.io-client';

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    socket: null,
    notificacoes: [], 
    toastAtivo: false, 
    notificacaoAtual: null, 
    naoLidas: 0,
    timeoutId: null 
  }),

  actions: {
    conectarSocket() {
      const auth = useAuthStore();
      if (!auth.admin?.id) return;

      if (this.socket) {
        this.socket.disconnect();
      }

      this.socket = io('http://localhost:3000'); 

      this.socket.on('connect', () => {
        this.socket.emit('joinAdminRoom', auth.admin.id);
      });

      this.socket.on('medicamento-atrasado', (dados) => {
        const novaNotificacao = { ...dados, id: Date.now(), lida: false };
        this.notificacoes.unshift(novaNotificacao);
        this.naoLidas++;

        this.notificacaoAtual = novaNotificacao;
        this.toastAtivo = true;

        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = setTimeout(() => {
          this.toastAtivo = false;
        }, 6000);
      });
    },

    desconectarSocket() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },

    removerNotificacao(id) {
      const index = this.notificacoes.findIndex(n => n.id === id);
      if (index !== -1) {
        if (!this.notificacoes[index].lida) {
          this.naoLidas--;
        }
        this.notificacoes.splice(index, 1);
      }
    },

    removerNotificacaoPorPrescricao(idPrescricao) {
      const index = this.notificacoes.findIndex(n => n.idPrescricao === idPrescricao);
      
      if (index !== -1) {
        if (!this.notificacoes[index].lida) {
          this.naoLidas--;
        }
        this.notificacoes.splice(index, 1);
      }
    }
  }
});