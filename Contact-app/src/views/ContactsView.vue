<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth.ts'
import ContactService from '../services/ContactService'
import type { Contact } from '../types/Contact'

const router = useRouter()
const authStore = useAuthStore()

const contacts = ref<Contact[]>([])
const search = ref('')
const showForm = ref(false)
const editingContact = ref<Contact | null>(null)
const formError = ref('')

const form = ref({
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  gender: 'Male',
  company: '',
})

const filteredContacts = computed(() => {
  return contacts.value.filter((c) =>
    `${c.firstname} ${c.lastname} ${c.email} ${c.phone}`
      .toLowerCase()
      .includes(search.value.toLowerCase()),
  )
})

onMounted(async () => {
  const response = await ContactService.getMyContacts()
  contacts.value = response.data.data
})

async function saveContact() {
  try {
    formError.value = ''
    if (editingContact.value) {
      const response = await ContactService.updateContact(editingContact.value._id, form.value)
      const index = contacts.value.findIndex((c) => c._id === editingContact.value!._id)
      contacts.value[index] = response.data
    } else {
      const response = await ContactService.createContact(form.value)
      contacts.value.push(response.data)
    }
    cancelForm()
  } catch (e) {
    const error = e as { response?: { data?: { message?: string } } }
    formError.value = error.response?.data?.message || 'Une erreur est survenue'
  }
}

function editContact(contact: Contact) {
  editingContact.value = contact
  form.value = {
    firstname: contact.firstname,
    lastname: contact.lastname,
    phone: contact.phone,
    email: contact.email,
    gender: contact.gender,
    company: contact.company || '',
  }
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
  editingContact.value = null
  form.value = { firstname: '', lastname: '', phone: '', email: '', gender: 'Male', company: '' }
}

async function deleteContact(id: string) {
  if (!confirm('Supprimer ce contact ?')) return
  await ContactService.deleteContact(id)
  contacts.value = contacts.value.filter((c) => c._id !== id)
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-3xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Mes contacts</h1>
        <div class="flex gap-3">
          <button
            @click="showForm = !showForm"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Ajouter
          </button>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Déconnexion
          </button>
        </div>
      </div>

      <input
        v-model="search"
        type="text"
        placeholder="Rechercher un contact..."
        class="w-full border rounded px-3 py-2 mb-6"
      />

      <div v-if="showForm" class="bg-white p-6 rounded shadow mb-6">
        <h2 class="text-lg font-semibold mb-4">
          {{ editingContact ? 'Modifier' : 'Nouveau contact' }}
        </h2>
        <form @submit.prevent="saveContact">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1">Prénom *</label>
              <input
                v-model="form.firstname"
                type="text"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label class="block mb-1">Nom *</label>
              <input
                v-model="form.lastname"
                type="text"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label class="block mb-1">Téléphone *</label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label class="block mb-1">Email *</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label class="block mb-1">Genre *</label>
              <select v-model="form.gender" class="w-full border rounded px-3 py-2" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label class="block mb-1">Entreprise</label>
              <input v-model="form.company" type="text" class="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div v-if="formError" class="bg-red-100 text-red-700 p-3 rounded mt-4">
            {{ formError }}
          </div>
          <div class="flex gap-3 mt-4">
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Enregistrer
            </button>
            <button
              type="button"
              @click="cancelForm"
              class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <div v-if="filteredContacts.length === 0" class="text-center text-gray-500 py-10">
        Aucun contact trouvé.
      </div>

      <div
        v-for="contact in filteredContacts"
        :key="contact._id"
        class="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
      >
        <RouterLink :to="`/contacts/${contact._id}`" class="flex-1">
          <p class="font-semibold">{{ contact.firstname }} {{ contact.lastname }}</p>
          <p class="text-sm text-gray-500">{{ contact.phone }} · {{ contact.email }}</p>
        </RouterLink>
        <div class="flex gap-2">
          <button @click="editContact(contact)" class="text-blue-600 hover:underline text-sm">
            Modifier
          </button>
          <button @click="deleteContact(contact._id)" class="text-red-500 hover:underline text-sm">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
