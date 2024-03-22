import {ref,reactive,toRefs} from 'vue'
import {notify} from '@/utils/element'

interface Params{
    initData?:any;
    add?:Function;
    update?:Function;
}

function useForm<T=any>(params:Params,emit?:any,props?:any){
     const {initData={},add=()=>{},update=()=>{}}=params
     const formRef=ref()
     const state=reactive({
        title:'新增',
        type:'add' as FormType,
        visible:false,
        loading:false,
        formData:{} as T,
        oldFormData:{} as T
     })

     function open(type:FormType,title:string,data:any){
         state.title=title
         state.type=type
         state.formData=JSON.parse(JSON.stringify({...initData,...data}))
         state.oldFormData=Object.assign({},state.formData)
         state.visible=true
     }

     function close(){
        if(state.loading) return
        formRef.value?.resetFields()
        state.visible=false
     }

     function submitForm(){
        formRef.value?.validate((valid:boolean)=>{
            if(!valid)return
            submitData()
        })
     }

     async function submitData() {
         try{
           state.loading=true
           let res;
           if(state.type=='edit'){
            res=await update(state.formData)
           }else{
             res=await add(state.formData)
           }
           state.loading=false
           if(res.code!=20000) return
           notify('操作成功！',{type:'success'})
           close()
           emit('refresh')
         }catch(error){

         }finally{
            state.loading=false
         }
     }

     return{
        formRef,
        ...toRefs(state),
        open,
        close,
        submitForm
     }

}

export {useForm}
export default useForm