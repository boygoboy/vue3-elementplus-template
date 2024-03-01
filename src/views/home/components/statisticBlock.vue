<template>
  <div class="home-statistic">
    <div class="home-statistic-title">营业数据统计</div>
    <el-row v-loading="state.loading" :gutter="15">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        v-for="(item, index) in blockList"
        :key="index"
      >
        <el-card
          class="home-business-card"
          shadow="hover"
          :style="{
            'background-image': `linear-gradient(to right, ${item.startColor}, ${item.endColor})`,
          }"
        >
          <div class="home-business-title">
            <span>{{ item.name }}</span>
            <el-tooltip :content="item.content" placement="top" effect="light">
              <SvgIcon name="ele-QuestionFilled"></SvgIcon>
            </el-tooltip>
          </div>
          <div class="item-num">
            <span>{{ state.statisticData[item.column] }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { getStatisticData } from "@/api/home";
import { reactive, onMounted } from "vue";

const blockList = [
  {
    column: "totalOrderNum",
    name: "订单笔数",
    unit: "笔",
    content: "订单笔数=(商品消费+快速消费+计次消费)的订单数",
    startColor: "#00ba26",
    endColor: "#00ba26a1",
  },
  {
    column: "totalSaleMoney",
    name: "销售总额",
    unit: "元",
    content: "销售总额=商品消费+快速消费+计次消费的合计金额",
    startColor: "#f52c12",
    endColor: "#f52c12c7",
  },
  {
    column: "totalReturnedMoney",
    name: "退款总额",
    unit: "元",
    content: "退款总额=退货或撤单的退款总金额",
    startColor: "#fb9a08",
    endColor: "#fb9a08db",
  },
  {
    column: "totalIncomeMoney",
    name: "综合收入",
    unit: "元",
    content: "综合收入是指店铺实际进帐金额",
    startColor: "#2062e6",
    endColor: "#2062e696",
  },
];

const state = reactive({
  loading: false,
  statisticData: {
    totalOrderNum: 0,
    totalSaleMoney: 0,
    totalReturnedMoney: 0,
    totalIncomeMoney: 0,
  } as any,
});

onMounted(() => {
  loadStatisticData();
});

async function loadStatisticData() {
  try {
    state.loading = true;
    const { data } = await getStatisticData();
    console.log(data);
    state.statisticData = data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.home-statistic {
  .home-statistic-title {
    font-size: 18px;
    height: 25px;
    line-height: 25px;
    border-left: 2px solid var(--el-color-primary);
    padding-left: 10px;
    margin: 15px 0;
  }
  .home-statistic-card {
    margin-bottom: 15px;
    padding-left: 9px;
    color: #fff;
    line-height: 30px;
    cursor: pointer;
    .home-business-title {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .item-num {
      font-size: 25px;
      font-weight: 500;
    }
    .unit {
      font-size: 13px;
      line-height: 16px;
      margin-left: 2px;
    }
  }
}
</style>
