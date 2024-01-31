import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.AXIOS_BASE_URL': JSON.stringify(process.env.AXIOS_BASE_URL),
    'import.meta.env.CLOUDINARY_API_KEY': JSON.stringify(process.env.CLOUDINARY_API_KEY),
    'import.meta.env.CLOUDINARY_UPLOAD_URL': JSON.stringify(process.env.CLOUDINARY_UPLOAD_URL),
    'import.meta.env.CLOUDINARY_UPLOAD_PRESET': JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
    'import.meta.env.CLOUDINARY_DELETE_URL': JSON.stringify(process.env.CLOUDINARY_DELETE_URL),
  },
})
