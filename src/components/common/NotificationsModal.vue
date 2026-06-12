<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-6 relative flex flex-col max-h-[80vh]">
        
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="relative flex items-center justify-center text-red-600">
              <Bell class="w-8 h-8" />
            </div>
            <h2 class="text-2xl font-extrabold text-black">Alertas</h2>
          </div>
          <button @click="$emit('close')" class="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
          
          <div v-if="notificacaoStore.notificacoes.length === 0" class="text-center py-8 text-gray-500">
            Nenhum alerta pendente.
          </div>

          <div 
            v-for="notif in notificacaoStore.notificacoes" 
            :key="notif.id"
            class="border border-gray-200 bg-white rounded-xl p-5 relative shadow-sm"
          >
            <span class="absolute top-5 right-5 text-xs text-gray-400 font-medium">
              {{ formatarHora(notif.horarioPlanejado) }}
            </span>

            <p class="text-sm text-black mb-3 pr-12 leading-relaxed">
              <strong>Atenção! Hora da medicação do(a) paciente</strong><span class="text-[#2b4c5e] font-bold">&nbsp;{{ notif.pacienteNome }}</span>.
            </p>
            
            <div class="text-sm text-gray-700 mb-5 space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p><strong class="text-black">Medicamento:</strong> {{ notif.medicamento }}</p>
              <p><strong class="text-black">Dosagem:</strong> {{ notif.dosagem }}</p>
              <p><strong class="text-black">Responsável:</strong> Enf. {{ notif.enfermeiroNome }}</p>
            </div>

            <div class="flex items-center justify-end">
              <button 
                @click="atenderNotificacao(notif.id)"
                class="px-6 py-2 rounded-lg text-sm font-bold text-white bg-[#2b4c5e] hover:bg-[#1a303d] transition-colors"
              >
                Ir até prescrições
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Bell, X } from 'lucide-vue-next';
import { useNotificationStore } from '../../stored/notifications';
import { useRouter } from 'vue-router';

const props = defineProps({
  isOpen: { type: Boolean, required: true }
});

const emit = defineEmits(['close']);

const notificacaoStore = useNotificationStore();
const router = useRouter();

const formatarHora = (timestamp) => {
  const data = new Date(timestamp);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const atenderNotificacao = () => {
  emit('close');
  router.push('/prescricoes');
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>