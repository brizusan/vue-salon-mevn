import {ref , computed , onMounted } from "vue"
import { useRouter } from "vue-router"
import {defineStore} from "pinia"
import { useToast } from "vue-toast-notification";
import AuthAPI from "@/services/AuthAPI";
import AppointmentAPI from "@/services/AppointmentAPI";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const loading = ref(false);
  const userAppointments = ref([]);
  const router = useRouter()
  const toast = useToast();

  onMounted(async() => {
    try {
      const {data} = await AuthAPI.validateToken()
      user.value = data
      await getAppointments()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  });

  const getAppointments = async () => {
    try {
      loading.value = true
      const {data} = await AppointmentAPI.getAppointments(user.value._id)
      userAppointments.value = data
    } catch (error) {
      console.log(error)
    } finally{
      loading.value = false
    }

  }

  const cancelReservation = async (id) => {
    const confirm = window.confirm('Estas seguro de cancelar la cita?') 
    if(!confirm) return
    try {
      const { data } = await AppointmentAPI.deleteAppointment(id);
      toast.open({
        message: data.msg,
        type: "success",
        position: "top-right",
        duration: 2000,
      });

      // lo que tengo en memoria
      userAppointments.value = userAppointments.value.filter(ap => ap._id !== id)

    } catch (error) {
      toast.error(error.response.data.msg, {
        timeout: 2000,
        position: "top-right",
        duration: 2000,
      })
    }
    //  finally {
    // realizar nueva consulta al cargar
    //    getAppointments()
    // }
 

  };

  const logout = () => {
    localStorage.removeItem('auth_token')
    toast.warning('Se ha cerrado sesión', { timeout: 1500, position: "top-right" });
    user.value = {}
    setTimeout(() => {
      router.push({name: 'login'})
    }, 1500);
  }

  const getUserName = computed(()=> user?.value.name ? user.value.name : '')

  const isEmptyAppointments = computed(() => {
    return userAppointments.value.length === 0;
  });

  return {
    user,
    userAppointments,
    loading,
    getUserName,
    getAppointments,
    cancelReservation,
    isEmptyAppointments,
    logout
  };
});