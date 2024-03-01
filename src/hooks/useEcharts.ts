import * as echarts from 'echarts';
import {ref,toRefs,reactive,markRaw,onMounted,onBeforeUnmount,watch,nextTick,onActivated} from 'vue';
interface Params{
    props:any;
    option:any;
}

function useEcharts(params:Params){
    const {props,option}=params
    const chartRef=ref()

    const state=reactive({
        nvll:['',null,undefined],
        chart:null as any,
    })
    watch(()=>[props.data,props.theme],([data,theme])=>{
        nextTick(()=>{
            initChart()
        })
    },{deep:true,immediate:true})

    function initChart(){
        if(state.nvll.indexOf(state.chart)===-1){
            state.chart.dispose()
        }
        state.chart=markRaw(echarts.init(chartRef.value,props.theme))
        state.chart.setOption(option)
    }
    function echartsResizeFun(){
        state.chart&&state.chart.resize()
    }
    onMounted(()=>{
        window.addEventListener('resize',echartsResizeFun)
    })
    onActivated(()=>{
        echartsResizeFun()
    })

    onBeforeUnmount(()=>{
        window.removeEventListener('resize',echartsResizeFun)
        if(state.chart){
            state.chart.dispose()
            state.chart=null
        }
    })
    return{
        chartRef,
        ...toRefs(state),
        echartsResizeFun
    }
}

export {useEcharts}
export default useEcharts