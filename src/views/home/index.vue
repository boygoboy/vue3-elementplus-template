<template>
  <div class="home-container">
    <StatisticBlock />
    <el-row :gutter="15" style="margin-top: 20px">
      <el-col :xs="24" :md="11" :lg="9" class="mb15">
        <PieChart
          width="100%"
          height="380px"
          title="分类销售统计"
          subtitle="每种商品分类的近30天销售数据"
          :theme="theme"
          :bgColor="bgColor"
          :data="state.category.data"
        >
        </PieChart>
      </el-col>
      <el-col :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <LineChart
          width="100%"
          height="380px"
          title="近30天销售数据"
          :theme="theme"
          :bgColor="bgColor"
          :data="state.last30Days.data"
          :xAxisData="state.last30Days.xAxisData"
        >
        </LineChart>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <BarChart
          width="100%"
          height="380px"
          title="会员消费Top10"
          subtitle="单位：元"
          :theme="theme"
          :bgColor="bgColor"
          :data="state.memberTop10.data"
          :xAxisData="state.memberTop10.xAxisData"
        >
        </BarChart>
      </el-col>
      <el-col :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <GaugeChart
          width="100%"
          height="380px"
          title="气温仪表盘 ℃"
          :theme="theme"
          :bgColor="bgColor"
          :data="state.temperature"
        >
        </GaugeChart>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import StatisticBlock from "./components/statisticBlock.vue";
import PieChart from "@/components/echarts/pieChart.vue";
import LineChart from "@/components/echarts/lineChart.vue";
import BarChart from "@/components/echarts/barChart.vue";
import GaugeChart from "@/components/echarts/gaugeChart.vue";
import { reactive, computed, onMounted } from "vue";
import {
  getCategoryData,
  getLast30DaysData,
  getMemberTop10Data,
} from "@/api/home";
import { useLayoutConfigStore } from "@/stores/layoutConfig";
import { number } from "echarts";
const layoutConfig = useLayoutConfigStore();

const theme = computed(() => (layoutConfig.isDark ? "dark" : ""));
const bgColor = computed(() => (layoutConfig.isDark ? "transparent" : ""));

const state = reactive({
  category: {
    loading: false,
    data: [],
  },
  last30Days: {
    loading: false,
    xAxisData: [] as string[],
    data: [] as any[],
  },
  memberTop10: {
    loading: false,
    xAxisData: [] as string[],
    data: [] as number[],
  },
  temperature: 33 as number,
});

onMounted(() => {
  loadCategoryData();
  loadLast30DaysSaleData();
  loadMemberTop10Data();
});

async function loadMemberTop10Data() {
  try {
    state.memberTop10.loading = true;
    const { data } = await getMemberTop10Data();
    state.memberTop10.data.length = 0;
    state.memberTop10.xAxisData.length = 0;
    data.forEach((item: any) => {
      state.memberTop10.data.push(item.consumeMoney);
      state.memberTop10.xAxisData.push(item.name);
    });
  } catch (error) {
  } finally {
    state.memberTop10.loading = false;
  }
}

async function loadCategoryData() {
  try {
    state.category.loading = true;
    const { data } = await getCategoryData();
    state.category.data = data;
  } catch (error) {
  } finally {
    state.category.loading = false;
  }
}

async function loadLast30DaysSaleData() {
  try {
    state.last30Days.loading = true;
    const { data } = await getLast30DaysData();
    const {
      last30Days,
      orderNumList,
      saleMoneyList,
      returnMoneyList,
      rechargeMoneyList,
    } = data;
    state.last30Days.xAxisData = last30Days;
    state.last30Days.data = [
      {
        typeName: "订单数",
        list: orderNumList,
      },
      {
        typeName: "销售额",
        list: saleMoneyList,
      },
      {
        typeName: "退货额",
        list: returnMoneyList,
      },
      {
        typeName: "充值额",
        list: rechargeMoneyList,
      },
    ];
  } catch (error) {
  } finally {
    state.last30Days.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 20px;
}
</style>
