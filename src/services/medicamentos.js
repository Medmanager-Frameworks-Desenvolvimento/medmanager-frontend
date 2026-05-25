import { api } from './api';

export default {
  listar() {
    return api.get('/medicamentos');
  },
  buscarPorId(id) {
    return api.get(`/medicamentos/${id}`);
  },
  criar(dados) {
    return api.post('/medicamentos', dados);
  },
  atualizar(id, dados) {
    return api.patch(`/medicamentos/${id}`, dados);
  },
  excluir(id) {
    return api.delete(`/medicamentos/${id}`);
  },
  buscarCatalogo(termo) {
    return api.get(`/medicamentos/catalogo?busca=${termo}`);
  }
};