<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <div v-if="prescricao">
      
      <div class="flex items-center gap-3 mb-6">
        <Eye class="w-6 h-6 text-[#2b4c5e]" stroke-width="2" />
        <h3 class="text-lg font-bold text-gray-900">Visualizar Prescrição</h3>
      </div>

      <div class="space-y-5 text-sm text-gray-800">
        
        <div>
          <p class="font-bold mb-0.5">Paciente:</p>
          <p>{{ prescricao.paciente?.nome }}, {{ prescricao.paciente?.idade }} anos</p>
        </div>

        <div>
          <p class="font-bold mb-0.5">Doença Crônica:</p>
          <ul 
            v-if="prescricao.paciente?.doenca_cronica && prescricao.paciente.doenca_cronica.length > 0"
            class="max-h-16 overflow-y-auto pr-2"
          >
            <li v-for="(doenca, index) in prescricao.paciente.doenca_cronica" :key="index" class="mb-1">
              {{ doenca }}
            </li>
          </ul>
          <p v-else>-</p>
        </div>

        <div>
          <p class="font-bold mb-0.5">Medicamento:</p>
          <p>{{ prescricao.medicamento?.nome }} - {{ prescricao.dosagem }}</p>
          <p class="text-gray-600 mt-0.5">Quantidade: {{ prescricao.quantidade }} {{ prescricao.unidade_medida || 'unid.' }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-bold mb-0.5">Horário:</p>
            <p>{{ formatarHora(prescricao.data_hora) }} ({{ prescricao.turno }})</p>
          </div>
          <div>
            <p class="font-bold mb-0.5">Responsável:</p>
            <p>Enf. {{ prescricao.enfermeiro?.nome }}</p>
          </div>
        </div>

        <hr class="border-gray-200 my-6" />

        <div>
          <p class="font-bold text-base text-gray-900 mb-3">Tomou a medicação?:</p>
          
          <div class="flex items-center gap-5">
            <button 
              type="button" 
              @click="statusTomou = true" 
              class="flex items-center gap-2.5 focus:outline-none group"
            >
              <div class="w-8 h-8 rounded-[10px] border-[1.5px] border-gray-400 flex items-center justify-center group-hover:border-gray-600 transition-colors">
                <X v-if="statusTomou === true" class="w-5 h-5 text-[#2b4c5e]" stroke-width="2.5" />
              </div>
              <span class="text-sm font-bold text-gray-900">Sim</span>
            </button>

            <button 
              type="button" 
              @click="statusTomou = false" 
              class="flex items-center gap-2.5 focus:outline-none group"
            >
              <div class="w-8 h-8 rounded-[10px] border-[1.5px] border-gray-400 flex items-center justify-center group-hover:border-gray-600 transition-colors">
                <X v-if="statusTomou === false" class="w-5 h-5 text-[#2b4c5e]" stroke-width="2.5" />
              </div>
              <span class="text-sm font-bold text-gray-900">Não</span>
            </button>
          </div>
        </div>

        <div class="flex justify-end items-center gap-4 mt-8 pt-2">
          <button 
            @click="$emit('close')" 
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          <PrimaryButton text="Salvar" @click="confirmarSalvamento" :disabled="salvando" />
        </div>

      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Eye, X } from 'lucide-vue-next';
import BaseModal from '../common/BaseModal.vue';
import PrimaryButton from '../common/PrimaryButton.vue';

const props = defineProps({
  isOpen: Boolean,
  prescricao: Object,
  salvando: Boolean
});

const emit = defineEmits(['close', 'save']);

const statusTomou = ref(false);

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.prescricao) {
    statusTomou.value = !!props.prescricao.tomou_medicacao;
  }
});

const formatarHora = (dataString) => {
  if (!dataString) return '-';
  const data = new Date(dataString);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const confirmarSalvamento = () => {
  emit('save', statusTomou.value);
};
</script>