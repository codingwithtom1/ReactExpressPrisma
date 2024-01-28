import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),basicSsl()],
  server: {
        proxy: {
            '^/csrf-token': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/protected': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/auth/login': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/auth/register': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/auth/logout': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/auth/pingauth': {
                target: 'http://localhost:3000/',
                secure: false
            },
            '^/weather': {
                target: 'http://localhost:3000/',
                secure: false
            }
        }
    }
})
