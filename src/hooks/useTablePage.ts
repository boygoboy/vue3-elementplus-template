import {notify,confirm} from '@/utils/element'
import {ref,unref,reactive,toRefs,onMounted,nextTick} from 'vue'
import type {Ref} from 'vue'
interface Params {
    disableMounted?:boolean|Ref;
    mustQuery?:any;
    getPageList:Function;
    deleteById:Function;
}

function useTablePage<T=any,Q=any>(params:Params,emit?:Function,props?:any){
const tableListRef=ref()
const editRef=ref()
const state=reactive({
    loading:false,
    query:{} as Q,
    page:{
        current:1,
        size:20,
        total:0
    } as PageType,
    tableList:[] as T[]
});

onMounted(()=>{
    if(unref(params.disableMounted)) return
    queryData()
})

async function queryData(){
    return new Promise(async (resolve,reject)=>{
       state.loading=true
       const query=params.mustQuery?Object.assign({},state.query,params.mustQuery):state.query
       params.getPageList&&params.getPageList(query,state.page.current,state.page.size).then((res:any)=>{
        state.loading=false
        const {records,total}=res.data
        state.tableList=[]
        nextTick(()=>{
            state.tableList=records
            state.page.total=total
        })
        resolve(res)
       }).catch((error:Error)=>{
        reject(error)
       }).finally(()=>{
        state.loading=false
       })
    })
}

function handleQuery(){
    state.page.current=1
    queryData()
}

function handleAdd(parentId?:string){
   editRef.value.open('add','新增',{parentId})
}

function handleEdit(row:T){
    editRef.value.open('edit','修改',row)
}

async function handleDelete(id:string){
    try{
       state.loading=true
       if(params.deleteById) await params.deleteById(id)
       notify('删除成功!',{type:'success'})
       handleQuery()
    }catch(error){

    }finally{
        state.loading=false
    }
}

return{
    ...toRefs(state),
    editRef,
    tableListRef,
    queryData,
    handleQuery,
    handleDelete,
    handleAdd,
    handleEdit
}

}

export{
    useTablePage
}
export default useTablePage
