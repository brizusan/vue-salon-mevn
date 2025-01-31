import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import ServiceAPI from "@/services/ServiceAPI";

export const useServicesStore = defineStore("services", () => {
  const services = ref([]);

  onMounted(async() => {
    try {
      const {data} = await ServiceAPI.getServices();
      services.value = data
    } catch (error) {
      console.log(error)
    }
  });

  return {
    services,
  };
});
