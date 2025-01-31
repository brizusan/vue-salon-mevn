<script setup>
import { formatCurrency } from "@/utils";
import { useAppointmentsStore } from "@/stores/appointments";

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const store = useAppointmentsStore();

</script>
<template>
  <div @click="store.getServiceSelected(props.service)"
    :class="[store.isServiceSelected(props.service._id) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-100 hover:bg-slate-300']"
    class="flex flex-col gap-3  p-3 rounded-md  hover:cursor-pointer transition-colors">
    <h3 :class="[store.isServiceSelected(props.service._id) && 'text-white']"
      class="text-lg capitalize text-slate-900 font-semibold">
      {{ service.name }}
    </h3>
    <p :class="[store.isServiceSelected(props.service._id) && 'text-white']"
      class="text-2xl lg:text-3xl text-blue-500 font-bold">
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
