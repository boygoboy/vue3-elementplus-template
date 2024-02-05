<template>
  <el-header class="layout-header">
    <div class="layout-header-index">
      <Breadcrumb />
      <UserDropdown />
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from "vue";
const Breadcrumb = defineAsyncComponent(() => import("./breadcrumb.vue"));
const UserDropdown = defineAsyncComponent(() => import("./userDropdown.vue"));
</script>
<style scoped></style>
