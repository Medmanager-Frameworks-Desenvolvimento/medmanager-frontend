import { api } from './api';

export default {
  listar() {
    return api.get('/enfermeiros');
  },
  buscarPorId(id) {
    return api.get(`/enfermeiros/${id}`);
  },
  criar(dados) {
    return api.post('/enfermeiros', dados);
  },
  atualizar(id, dados) {
    return api.patch(`/enfermeiros/${id}`, dados);
  },
  excluir(id) {
    return api.delete(`/enfermeiros/${id}`);
  }
};