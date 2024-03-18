<template>
  <el-row v-show="page.total || always" justify="end" class="mt20">
    <el-pagination
      :background="background"
      :pager-count="pagerCount"
      :page-sizes="[10, 20, 50, 100]"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :layout="layout"
    >
    </el-pagination>
  </el-row>
</template>

<script lang="ts" name="GlobalPage" setup>
interface IPage {
  current: number;
  size: number;
  total: number;
}

const props = withDefaults(
  defineProps<{
    page: IPage;
    pagerCount?: number;
    background?: boolean;
    always?: boolean;
    layout?: string;
  }>(),
  {
    page: () => ({
      current: 1,
      size: 20,
      total: 0,
    }),
    pagerCount: 7,
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
  }
);

const emit = defineEmits(["pageChange"]);

function handleSizeChange(val: number) {
  props.page.size = val;
  emit("pageChange");
}

function handleCurrentChange(val: number) {
  props.page.current = val;
  emit("pageChange");
}
</script>
