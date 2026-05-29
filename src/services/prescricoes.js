import { api } from './api';

export default {
  listar() {
    return api.get('/prescricoes');
  },
  buscarPorId(id) {
    return api.get(`/prescricoes/${id}`);
  },
  criar(dados) {
    return api.post('/prescricoes', dados);
  },
  atualizar(id, dados) {
    return api.patch(`/prescricoes/${id}`, dados);
  },
  excluir(id) {
    return api.delete(`/prescricoes/${id}`);
  },
  buscarTotais() {
    return api.get('/prescricoes/totais'); 
  }
};