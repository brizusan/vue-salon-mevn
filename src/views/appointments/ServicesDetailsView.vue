<script setup>
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import ServiceSelected from "@/components/ServiceSelected.vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { formatCurrency } from "@/utils";

const store = useAppointmentsStore();
const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});

const disabledDates = (date) => {
  const currentDate = new Date();
  return (
    (date < currentDate.setDate(currentDate.getDate() - 1)) |
    (date.getMonth() > currentDate.getMonth() + 1)
  );
};

</script>
<template>
  <h2 class="text-3xl font-bold text-white mt-8">Reservaciones</h2>
  <p class="text-white text-lg mt-5 font-semibold">
    Verifica la informacion y detalles de tu cita
  </p>

  <h3
    v-if="store.isEmptyServices"
    class="text-xl font-semibold text-white mt-10 text-center"
  >
    No tenemos servicios seleccionados
  </h3>
  <h3 v-else class="text-xl font-semibold text-white mt-8">Servicios</h3>

  <section v-if="!store.isEmptyServices" class="grid xl:grid-cols-2 gap-4 my-6">
    <ServiceSelected
      v-for="service in store.services"
      :key="service._id"
      :service="service"
      @remove-service="store.removeService"
    />
  </section>
  <section v-if="!store.isEmptyServices">
    <h4 class="text-xl text-right font-semibold text-white my-6">
      Total a pagar :
      <span class="text-blue-400 font-bold text-2xl xl:text-3xl">{{
        formatCurrency(store.totalPagar)
      }}</span>
    </h4>
    <h3 class="text-xl font-semibold text-white my-6">Fecha y Hora</h3>
    <div
      class="lg:flex gap-3 items-start space-y-6 lg:space-y-0 xl:items-center xl:gap-8"
    >
      <vue-tailwind-datepicker
        :disable-date="disabledDates"
        disable-in-range
        no-input
        as-single
        i18n="es-mx"
        :formatter="formatter"
        v-model="store.date"
      />

      <div
        v-if="store.date"
        class="flex-1 flex flex-wrap gap-4 xl:grid xl:grid-cols-2 2xl:grid-cols-3 xl:gap-3"
      >
        <button
          v-for="hour in store.hours"
          :key="hour"
          class="text-lg px-4 lg:px-5 py-2 rounded-md disabled:opacity-20 disabled:bg-slate-500/30 disabled:cursor-not-allowed"
          :class="[
            store.time === hour
            ? 'bg-white  text-slate-800'
            : 'bg-slate-500/30 text-white hover:bg-slate-600 ',
          ]"
          @click="store.time = hour"
          :disabled="store.disabledHour(hour) ? true : false"
        >
          {{ hour }}
        </button>
      </div>
    </div>
    <div
      v-if="store.isValidReservation"
      class="flex justify-end py-4 pt-8 lg:py-0"
    >
      <button
        @click="store.saveReservation"
        class="w-[250px] bg-blue-500 hover:bg-blue-600 py-2 text-white uppercase font-semibold transition-colors rounded-md"
      >
        Confirmar Reservacion
      </button>
    </div>
  </section>
</template>
