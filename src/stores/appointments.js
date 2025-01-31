import { ref, computed, onMounted, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useUserStore} from "@/stores/user"
import AppointmentAPI from "@/services/AppointmentAPI";
import { generateHours } from "@/utils";
import { convertToIso, formatDateDDMMYYYY } from "@/utils/date";

export const useAppointmentsStore = defineStore("appointments", () => {
  const toast = useToast();
  const router = useRouter();
  const store = useUserStore()
  const idAppointment = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  watch(date, async () => {
    time.value = "";
    if (date.value === "") return;
    const { data } = await AppointmentAPI.getAppointmentByDate(date.value);
    if (idAppointment.value) {
      //editar
      // habiltar la hora de la cita
      appointmentsByDate.value = data.filter(
        (apd) => apd._id !== idAppointment.value
      );
      const currentAppointment = data.find(
        (apd) => apd._id === idAppointment.value
      );
      // traigo la hora de la cita que estoy editando
      time.value = currentAppointment.time;
    } else {
      // nuevo registro
      appointmentsByDate.value = data;
    }
  });

  onMounted(() => {
    hours.value = generateHours(8, 20);
  });

  const setSelectAppointment = (appointment) => {
    idAppointment.value = appointment._id;
    services.value = appointment.services;
    date.value = formatDateDDMMYYYY(appointment.date);
    time.value = appointment.time;
  };

  const getServiceSelected = (service) => {
    const { _id: id } = service;
    if (isServiceSelected.value(id)) {
      removeService(id);
    } else {
      if (services.value.length >= 3) {
        alert("Maximo 3 servicios por cita");
        return;
      }
      services.value.push(service);
    }
  };

  const saveReservation = async () => {
    const reservation = {
      date: convertToIso(date.value),
      time: time.value,
      services: services.value.map((s) => s._id),
      total: totalPagar.value,
    };

    if (idAppointment.value) {
      // editando registro
      try {
        const { data } = await AppointmentAPI.updateAppointment(
          idAppointment.value,
          reservation
        );
        toast.open({
          message: data.msg,
          type: "success",
          position: "top-right",
          duration: 2000,
        });
      } catch {
        toast.error(data.response.data.msg, {
          timeout: 2000,
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      // actializando registro
      try {
        const { data } = await AppointmentAPI.createAppointment(reservation);
        toast.open({
          message: data.msg,
          type: "success",
          position: "top-right",
          duration: 2000,
        });
      } catch {
        toast.error("Error al crear la cita", {
          timeout: 2000,
          position: "top-right",
        });
      }
    }
    setTimeout(() => {
      cleanReservation();
      store.getAppointments()
      router.push({ name: "my-appointments" });
    }, 2000);
  };


  const cleanReservation = () => {
    services.value = [];
    date.value = "";
    time.value = "";
    idAppointment.value = "";
  };

  const removeService = (id) => {
    services.value = services.value.filter((s) => s._id !== id);
  };

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const isEmptyServices = computed(() => {
    return services.value.length === 0;
  });

  const isValidReservation = computed(() => {
    return date.value && time.value && !isEmptyServices.value;
  });

  const disabledHour = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find((apd) => apd.time === hour);
    };
  });

  const totalPagar = computed(() => {
    return services.value.reduce((acc, service) => acc + service.price, 0);
  });

  return {
    services,
    date,
    hours,
    time,
    setSelectAppointment,
    getServiceSelected,
    removeService,
    saveReservation,
    cleanReservation,
    isEmptyServices,
    isServiceSelected,
    isValidReservation,
    disabledHour,
    totalPagar,
  };
});
