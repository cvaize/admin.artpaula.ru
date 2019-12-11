import axios from 'axios'

export const getAttrGroups = function () {
  return axios.get('/attrs-group')
}
export const getAttrs = function () {
  return axios.get('/attrs')
}
