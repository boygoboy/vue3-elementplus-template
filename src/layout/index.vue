<template>
  <el-container class="layout-container">
    <LayoutAside />
    <el-container direction="vertical">
      <LayoutHeader />
      <LayoutMain />
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const LayoutAside = defineAsyncComponent(
  () => import("./layoutAside/index.vue")
);
const LayoutHeader = defineAsyncComponent(
  () => import("./layoutHeader/index.vue")
);
const LayoutMain = defineAsyncComponent(() => import("./layoutMain/index.vue"));
</script>
<style scoped></style>
