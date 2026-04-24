<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../http-common'

const router = useRouter()
const error = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  confirm_password: '',
})

async function register() {
  try {
    error.value = ''
    await http.post('/users', form.value)
    await router.push('/login')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Une erreur est survenue'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="register"
      class="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">{{ error }}</div>

      <input
        v-model="form.name"
        class="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="text"
        placeholder="Username"
        required
      />
      <input
        v-model="form.email"
        class="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="form.password"
        class="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="form.confirm_password"
        class="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="password"
        placeholder="Confirm Password"
        required
      />

      <button
        type="submit"
        class="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
      >
        Create Account
      </button>

      <p class="text-center mt-4">
        Already have an account?
        <RouterLink to="/login" class="text-blue-500 underline">Log In</RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped></style>
