import {defineStore} from 'pinia'
import {Local} from '@/utils/storage'
import { nextTick } from 'vue'

export const useLayoutConfigStore=defineStore('layoutConfig',{
    state:():LayoutConfigState=>{
        return{
            isCollapse:false,
            globalTitle:'vue3+ts后台管理系统',
            isFullscreen:false,
            isDark:false
        }
    },
    getters:{

    },
    actions:{
        updateState(state:LayoutConfigState){
          this.$patch(state)
        }
    }
})

nextTick(()=>{
    const layoutConfig=useLayoutConfigStore()
    layoutConfig.$subscribe((mutation,state)=>{
        Local.set('layoutConfig',state)
    })
})
