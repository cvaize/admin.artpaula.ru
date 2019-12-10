import axios from 'axios'

export const getGroups = function () {
  return axios.get('/attrs-group')
}

const api = {
  getGroups
}

export default api
