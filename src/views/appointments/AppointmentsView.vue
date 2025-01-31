<script setup>

import CitaItem from "@/components/CitaItem.vue";
import { useUserStore } from "@/stores/user";
const store = useUserStore()

</script>
<template>
  <h2 class="text-3xl font-bold text-white mt-8">Mis Citas</h2>
  <p class="text-white text-lg mt-5 font-semibold">
    Puedes ver y administrar tus citas
  </p>

  <p v-if="store.loading" class="text-white text-center text-sm font-bold mt-5 tracking-widest">cargando...</p>

  <h3 
    v-if="store.isEmptyAppointments && !store.loading"
    class="text-xl font-semibold text-red-400 text-center mt-10">No tenemos citas reservadas por el momento</h3>

  <section v-else class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6 items-start">
    <CitaItem 
      v-for="cita in store.userAppointments"
      :key="cita._id"
      :cita="cita"
    />
  </section>
</template>