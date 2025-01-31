import { ref , computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import AuthAPI from "@/services/AuthAPI";

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();
  const router = useRouter();
  const error = ref("")

  const registerUser = async (data) => {
    try {
      const { data: response } = await AuthAPI.createAccount(data);
      toast.success(response.msg, { timeout: 2000, position: "top-right" });
      setTimeout(() => {
        router.push({ name: "login" });
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        timeout: 2000,
        position: "top-right",
      });
    }
  };

  const confirmAccount = async (token) => {
    error.value = ""
    try {
      const { data: response } = await AuthAPI.confirmAccount(token);
      toast.success(response.msg, { timeout: 2000, position: "top-right" });
    } catch (e) {
      error.value = e.response.data.msg
    }
  };

  const loginAccount = async (data) => {
    try {
      const { data: response } = await AuthAPI.login(data);
      localStorage.setItem("auth_token", response.token);
      toast.success(response.msg, { timeout: 2000, position: "top-right" });
      setTimeout(() => {
        router.push({ name: "my-appointments" });
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        timeout: 2000,
        position: "top-right",
      });
    }
  };

  const forgotPassword = async (data) => {
    try {
      const { data: response } = await AuthAPI.forgotPassword(data);
      toast.success(response.msg, { timeout: 2000, position: "top-right" });
    } catch (error) {
      toast.error(error.response.data.msg, {
        timeout: 2000,
        position: "top-right",
      });
    }
  };

  const verifyTokenForgot = async (token) => {
    try {
      const {data} =   await AuthAPI.validateForgotToken(token)
      toast.success(data.msg, { timeout: 2000, position: "top-right" });
    } catch (error) {
      router.push({ name: "login" })
      throw new Error (error.response.data.msg)

    }
  };

  const resetPassword = async (token, data) => {
    try {
      const { data: response } = await AuthAPI.resetPassword(token, data);
      console.log(response)
      toast.success(response.msg, { timeout: 2000, position: "top-right" });
      setTimeout(() => {
        router.push({ name: "login" });
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        timeout: 2000,
        position: "top-right",
      });
    }
  }

  const isError = computed(() => {
    return error.value !== ""
  })

  return {
    error,
    isError,
    registerUser,
    confirmAccount,
    loginAccount,
    forgotPassword,
    verifyTokenForgot,
    resetPassword
  };
});
