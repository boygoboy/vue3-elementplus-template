<template>
  <div class="h100">
    <el-aside
      class="layout-aside layout-aside-menu-200"
      :class="
        layoutConfig.isCollapse
          ? 'layout-aside-menu-60'
          : 'layout-aside-menu-200'
      "
    >
      <Logo />
      <VerticalMenu />
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { defineAsyncComponent } from "vue";
import { useLayoutConfigStore } from "@/stores/layoutConfig";
const Logo = defineAsyncComponent(() => import("./components/logo.vue"));
const VerticalMenu = defineAsyncComponent(
  () => import("./components/verticalMenu.vue")
);
const layoutConfig = useLayoutConfigStore();
</script>
<style scoped></style>
