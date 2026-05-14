<template>
  <div class="space-y-6">

    <div>
      <h2 class="text-xl font-extrabold text-[#2b4c5e]">
        Dashboard
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <StatCard 
        title="Total de Pacientes"
        :value="stats.totalPacientes"
        :icon="Users"
      />

      <StatCard 
        title="Pacientes sem tomar medicação"
        :value="stats.pacientesSemMedicacao"
        :icon="AlertTriangle"
        iconClass="text-red-400"
      />

      <StatCard 
        title="Total de Medicamentos"
        :value="stats.totalMedicamentos"
        :icon="Pill"
      />

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
      
      <ChartCard 
        title="Quantidade de Prescrições por Turno"
        type="bar"
        :options="barOptions"
        :series="barSeries"
      />

      <ChartCard 
        title="Distribuição de Doenças Crônicas"
        type="pie"
        :options="pieOptions"
        :series="pieSeries"
      />

    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Users, AlertTriangle, Pill } from 'lucide-vue-next'; 
import ChartCard from '../../components/dashboard/ChartCard.vue';
import StatCard from '../../components/dashboard/StatCard.vue'; 
import { api } from '../../services/api'; 

const stats = reactive({
  totalPacientes: 0,
  pacientesSemMedicacao: 0,
  totalMedicamentos: 0
});

const barSeries = ref([
  {
    name: 'Prescrições',
    data: [] 
  }
]);

const barOptions = ref({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit'
  },
  colors: ['#304e5e', '#79a2ba', '#739d8f'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 2,
      columnWidth: '55%',
    }
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: {
    categories: [], 
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    min: 0,
    forceNiceScale: true
  }
});

const pieSeries = ref([]);

const pieOptions = ref({
  chart: {
    type: 'pie',
    fontFamily: 'inherit'
  },
  labels: [],
  colors: ['#304e5e', '#79a2ba', '#739d8f'],
  stroke: {
    width: 2,
    colors: ['#ffffff']
  },
  legend: {
    position: 'right',
    offsetY: 40,
    markers: { radius: 12 }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '11px',
      fontWeight: 'bold',
    },
    dropShadow: { enabled: false }
  },
  tooltip: { enabled: true } 
});

onMounted(async () => {
  try {
    const response = await api.get('/prescricoes/resumo');
    const dados = response.data;

    stats.totalPacientes = dados.pacientes;
    stats.pacientesSemMedicacao = dados.pacientesNaoMedicados;
    stats.totalMedicamentos = dados.medicamentos;

    barSeries.value = [{
      name: 'Prescrições',
      data: dados.graficoTurnos.series
    }];

    barOptions.value = {
      ...barOptions.value,
      xaxis: {
        ...barOptions.value.xaxis,
        categories: dados.graficoTurnos.labels
      }
    };

    if (dados.graficoDoencas.series.length > 0) {
      pieSeries.value = dados.graficoDoencas.series;
      
      pieOptions.value = {
        ...pieOptions.value,
        labels: dados.graficoDoencas.labels,
        colors: ['#304e5e', '#79a2ba', '#739d8f', '#eab308', '#ef4444'],
        tooltip: { enabled: true }
      };
    } else {
      pieSeries.value = [1];
      
      pieOptions.value = {
        ...pieOptions.value,
        labels: ['Sem dados'],
        colors: ['#e5e7eb'],
        tooltip: { enabled: false }
      };
    }

  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
  }
});
</script>