import http from '../http-common'

function getHeaders() {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export default {
  getMyContacts() {
    return http.get('/contacts/me', { headers: getHeaders() })
  },

  getContact(id: string) {
    return http.get(`/contacts/${id}`, { headers: getHeaders() })
  },

  createContact(data: object) {
    return http.post('/contacts', data, { headers: getHeaders() })
  },

  updateContact(id: string, data: object) {
    return http.put(`/contacts/${id}`, data, { headers: getHeaders() })
  },

  deleteContact(id: string) {
    return http.delete(`/contacts/${id}`, { headers: getHeaders() })
  },
}
