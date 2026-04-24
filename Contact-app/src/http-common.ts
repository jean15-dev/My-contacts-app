// Configuration axios pour l'api

import axios from 'axios';

export default axios.create({
  baseURL: "https://api-contact.zoul.dev/api",
  headers: {
    "Content-type": "application/json",
  },
});
