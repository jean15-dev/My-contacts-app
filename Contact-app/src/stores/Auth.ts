/*Storing token and user*/
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const _id = ref<string | null>(null)
  const name = ref<string | null>(null)
  const email = ref<string | null>(null)
  const token = ref<string | null>(null)

  function login(userData: { _id: string; name: string; email: string; token: string }) {
    _id.value = userData._id
    name.value = userData.name
    email.value = userData.email
    token.value = userData.token
    localStorage.setItem('token', userData.token)
  }

  function logout() {
    _id.value = null
    name.value = null
    email.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  function initFromStorage() {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  return { _id, name, email, token, login, logout, initFromStorage }
})
