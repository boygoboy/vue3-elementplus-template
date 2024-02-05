import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

export default defineConfig(({mode})=>{
    const env=loadEnv(mode,process.cwd())
  return{
    server:{
      open:false,
      host:'0.0.0.0',
      port:8888,
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_APP_SERVICE_URL,
          changeOrigin:true,
          rewrite:(path)=>path.replace(new RegExp(`^${env.VITE_APP_BASE_API}/`),'')
        }
      }
    },
    plugins: [
      vue(),
      vueSetupExtend()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

