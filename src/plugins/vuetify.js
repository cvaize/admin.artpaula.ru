import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from '../locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru'
  },
  noDataText: 'Нет данных',
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#007bff',
        secondary: '#6c757d',
        accent: '#343a40',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
