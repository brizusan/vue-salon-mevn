import { api } from "@/lib/axios";

export default {
  createAppointment(data) {
    return api.post('/appointment', data)
  },
  getAppointmentByDate(date) {
    return api.get(`/appointment?date=${date}`)
  },
  getAppointments(id) {
    return api.get(`/appointment/user/${id}`)
  },
  getAppointmentByID(id) {
    return api.get(`/appointment/${id}/editar`)
  },
  updateAppointment(id, data) {
    return api.put(`/appointment/${id}/editar`, data)
  },
  deleteAppointment(id) {
    return api.delete(`/appointment/${id}/eliminar`)
  }


}