import { api } from "@/lib/axios";

export default{
  validateToken() {
    return api.get('/auth/user')
  },
  validateAdmin() {
    return api.get('/auth/admin')
  },
  createAccount(data) {
    return api.post('/auth/register', data)
  },
  confirmAccount(token) {
    return api.get(`/auth/register/verify/${token}`)
  },
  login(data) {
    return api.post('/auth/login', data)
  },
  forgotPassword(data) {
    return api.post('/auth/forgot-password', data)
  },
  validateForgotToken(token) {
    return api.get(`/auth/forgot-password/${token}`)
  },
  resetPassword(token, data) {
    return api.patch(`/auth/forgot-password/${token}`, data)
  }
}