<template>
  <el-card shadow="hover">
    <div
      ref="chartRef"
      :style="{ width: props.width, height: props.height }"
    ></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useEcharts } from "@/hooks/useEcharts";
import { reactive, computed } from "vue";

interface Series {
  typeName: string;
  list: number[];
}

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    theme?: string;
    bgColor?: string;
    title: string;
    subtitle?: string;
    data: Series[];
    xAxisData: string[];
  }>(),
  {
    width: "100%",
    height: "380px",
    data: () => [],
  }
);

const legendData = computed(() => {
  return props.data.map((item) => item.typeName);
});

const series = computed(() => {
  return props.data.map((item) => {
    return {
      name: item.typeName,
      type: "line",
      smooth: 0.5,
      emphasis: {
        focus: "series",
      },
      data: item.list,
    };
  });
});

const option = reactive({
  backgroundColor: props.bgColor,
  title: {
    text: props.title,
    subtext: props.subtitle,
    x: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    right: "50px",
    data: legendData,
  },
  toolbox: {
    feature: {
      saveAsImage: {
        title: "下载为图片",
      },
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [{ data: computed(() => props.xAxisData) }],
  yAxis: [{ type: "value" }],
  series: series,
});
const { chartRef } = useEcharts({ props, option });
</script>

<style lang="scss" scoped></style>
