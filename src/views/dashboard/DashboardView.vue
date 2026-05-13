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
import { reactive, onMounted } from 'vue';
import { Users, AlertTriangle, Pill } from 'lucide-vue-next'; 
import ChartCard from '../../components/dashboard/ChartCard.vue';
import StatCard from '../../components/dashboard/StatCard.vue'; 

const stats = reactive({
  totalPacientes: 0,
  pacientesSemMedicacao: 0,
  totalMedicamentos: 0
});

const barSeries = reactive([
  {
    name: 'Prescrições',
    data: [10, 20, 5] 
  }
]);

const barOptions = reactive({
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
    categories: ['Manhã', 'Tarde', 'Noite'],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    min: 0,
    forceNiceScale: true
  }
});

const pieSeries = reactive([10, 30, 9]);

const pieOptions = reactive({
  chart: {
    type: 'pie',
    fontFamily: 'inherit'
  },
  labels: ['Diabetes', 'Hipertensão', 'Outras'],
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
  }
});

onMounted(async () => {
  
  setTimeout(() => {
    stats.totalPacientes = 15;
    stats.pacientesSemMedicacao = 5;
    stats.totalMedicamentos = 50;

    barSeries[0].data = [11, 4, 12];
    pieSeries.splice(0, pieSeries.length, 40, 45, 15);
  }, 1000);
});
</script>