<template>
  <el-card shadow="hover">
    <div
      ref="chartRef"
      :style="{ width: props.width, height: props.height }"
    ></div>
  </el-card>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { stat } from "fs";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  onActivated,
  markRaw,
} from "vue";

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    theme?: string;
    bgColor?: string;
    title: string;
    subtitle: string;
    data: any[];
  }>(),
  {
    width: "100%",
    height: "300px",
    data: () => [],
  }
);
const chartRef = ref();
const state = reactive({
  nvll: ["", null, undefined],
  chart: null as any,
});

watch(
  () => [props.data, props.theme],
  ([data, theme]) => {
    nextTick(() => {
      initChart();
    });
  },
  { deep: true }
);

function initChart() {
  if (state.nvll.indexOf(state.chart) === -1) {
    state.chart.dispose();
  }
  state.chart = markRaw(echarts.init(chartRef.value, props.theme));
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.title,
      subtext: props.subtitle,
      x: "left",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        name: "单位：元",
        radius: "60%",
        top: 20,
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };
  state.chart.setOption(option);
}

function echartsResizeFun() {
  state.chart && state.chart.resize();
}

onMounted(() => {
  window.addEventListener("resize", echartsResizeFun);
});

onActivated(() => {
  echartsResizeFun();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", echartsResizeFun);
  if (state.chart) {
    state.chart.dispose();
    state.chart = null;
  }
});
</script>
