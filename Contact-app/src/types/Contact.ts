export interface Contact {
  _id: string
  firstname: string
  lastname: string
  phone: string
  email: string
  gender: string
  birthdate?: string
  position?: string
  company?: string
  user: {
    _id: string
    name: string
  }
}
