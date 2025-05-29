import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

// hard reload
window.addEventListener('load', () => {
  console.log('Page was refreshed')
  localStorage.removeItem('user')
})
