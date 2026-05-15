import { api } from './api';

export default {
  listar() {
    return api.get('/pacientes');
  },
  buscarPorId(id) {
    return api.get(`/pacientes/${id}`); 
  },
  criar(dados) {
    return api.post('/pacientes', dados);
  },
  atualizar(id, dados) {
    return api.patch(`/pacientes/${id}`, dados); 
  },
  excluir(id) {
    return api.delete(`/pacientes/${id}`);
  }
};