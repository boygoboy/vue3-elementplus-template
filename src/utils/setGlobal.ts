import {type App} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import SvgIcon from '@/components/svgIcon/index.vue'

export function useElIcon(app:App){
    for(const [key,component] of Object.entries(ElementPlusIconsVue)){
      app.component(`ele-${key}`,component)
    }
    app.component('SvgIcon',SvgIcon)
}