<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const { token } = route.params;
const store = useAuthStore();

onMounted(async () => {
  await store.confirmAccount(token);
});
</script>
<template>
  <div
    :class="[store.isError && 'bg-red-600 border-red-600']"
    class="text-center min-h-[10vh] py-10 border border-blue-600 rounded-md shadow shadow-blue-600 max-w-[600px] mx-auto flex flex-col justify-center gap-10"
  >
    <h2 class="text-3xl font-bold text-slate-300 uppercase">
      Confirmar Cuenta
    </h2>
    <p class="text-lg font-semibold text-slate-100">
      {{
        store.isError
          ? store.error
          : `Cuenta Confirmada , ya puedes  iniciar sesion`
      }}
    </p>
  </div>
</template>
