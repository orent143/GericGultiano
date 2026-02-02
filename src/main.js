import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from '@/routes/router.js'
import './assets/global.css'
import 'primeicons/primeicons.css';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes'

// Dark Blue variant
const DarkBluePreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    neutral: {
      50: '#1f2937',   // dark background
      100: '#111827',
      200: '#1e293b',
      300: '#374151',
      400: '#4b5563',
      500: '#6b7280',
      600: '#9ca3af',
      700: '#d1d5db',
      800: '#e5e7eb',
      900: '#f9fafb'
    }
  }
})

createApp(App)
  .use(router)
  .use(PrimeVue, { theme: { preset: DarkBluePreset, options: { dark: false } } })
  .mount('#app')
