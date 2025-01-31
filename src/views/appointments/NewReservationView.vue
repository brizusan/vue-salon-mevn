<script setup>
import ServiceItem from "@/components/ServiceItem.vue"
import {useServicesStore as useService} from "@/stores/services"

const store = useService()

</script>
<template>
   <h2 class="text-3xl font-bold text-white mt-8">Servicios</h2>
   <p class="text-white text-lg mt-5 font-semibold">Elige un servicio para tu cita</p>

   <section class="grid grid-cols-2 gap-4 mt-10">
    <ServiceItem 
      v-for="service in store.services"
      :key="service._id"
      :service="service" 
    />
  </section> 

</template>