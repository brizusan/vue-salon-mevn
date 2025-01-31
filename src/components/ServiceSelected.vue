<script setup>
import {  TrashIcon } from '@heroicons/vue/24/solid';
import { formatCurrency } from '@/utils';

const props = defineProps({
  service: {
    type: Object,
  },

})

defineEmits(['remove-service'])

</script>
<template>
  <div class="
    relative bg-transparent border border-slate-200 rounded-md p-4 space-y-3">
    <h3 class="text-lg text-white uppercase tracking-wider font-semibold">{{ service.name }}</h3>
    <p class="text-2xl font-bold text-blue-400 ">{{formatCurrency(service.price)}}</p>

    <button 
      @click="$emit('remove-service', service._id)"
      class="absolute top-3 right-3 hover:scale-110 transition rounded-full"
    >
      <TrashIcon class="w-7 h-7 text-red-400" />
    </button>
  </div>

</template>