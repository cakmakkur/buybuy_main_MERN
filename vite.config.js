import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const SERVER_BASE_URL = 'https://buybuy-server.nw.r.appspot.com/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: SERVER_BASE_URL
})
