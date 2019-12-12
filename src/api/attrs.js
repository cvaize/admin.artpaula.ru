import axios from 'axios'

export const getAttrGroups = function () {
  return axios.get('/attrs-group')
}
export const getAttrs = function () {
  return axios.get('/attrs')
}
export const uploadAttrs = function (data) {
  return axios.post('/attrs', data)
}
