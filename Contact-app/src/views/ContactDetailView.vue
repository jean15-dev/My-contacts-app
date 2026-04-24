<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Contact } from '../types/Contact'
import ContactService from '../services/ContactService'

const route = useRoute()
const contact = ref<Contact | null>(null)

onMounted(async () => {
  const response = await ContactService.getContact(route.params.id as string)
  contact.value = response.data
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <RouterLink to="/contacts" class="text-blue-600 text-sm hover:underline">← Retour</RouterLink>
      <div v-if="contact" class="mt-4">
        <h1 class="text-2xl font-bold mb-2">{{ contact.firstname }} {{ contact.lastname }}</h1>
        <p class="text-gray-600 mb-1">{{ contact.phone }}</p>
        <p class="text-gray-600 mb-1">{{ contact.email }}</p>
        <p class="text-gray-600 mb-1">{{ contact.gender }}</p>
        <p v-if="contact.company" class="text-gray-600 mb-1">{{ contact.company }}</p>
        <p v-if="contact.position" class="text-gray-600 mb-1">{{ contact.position }}</p>
        <p v-if="contact.birthdate" class="text-gray-600 mb-1">{{ contact.birthdate }}</p>
      </div>
      <div v-else class="mt-4 text-gray-500">Chargement...</div>
    </div>
  </div>
</template>

<style scoped></style>
