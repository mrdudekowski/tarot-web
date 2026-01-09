import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'

console.log('🚀 Starting Vue app...')

try {
  import('@twa-dev/sdk').then(({ WebApp }) => {
    try {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        WebApp.ready()
        WebApp.expand()
        console.log('✅ Telegram WebApp initialized')
      } else {
        console.log('ℹ️ Running outside Telegram, WebApp features disabled')
      }
    } catch (error) {
      console.warn('⚠️ Telegram WebApp SDK error:', error)
    }
  }).catch(() => {
    console.log('ℹ️ @twa-dev/sdk not loaded, continuing without Telegram features')
  })
} catch (error) {
  console.warn('⚠️ Error loading Telegram SDK:', error)
}

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

app.mount('#app')

console.log('✅ Vue app mounted')
