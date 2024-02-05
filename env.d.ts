
declare module '*.vue'{
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
    const zhLocale: any;
    export default zhLocale;
  }
  
  declare module 'element-plus/dist/locale/en.mjs' {
    const enLocale: any;
    export default enLocale;
  }

  
