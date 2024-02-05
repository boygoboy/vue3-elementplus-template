<template>
  <div class="layout-header-breadcrumb">
    <SvgIcon
      :name="layoutConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'"
      class="layout-header-expand-icon"
      @click="handleChangeCollapse"
    ></SvgIcon>
    <el-breadcrumb separator="/">
      <TransitionGroup name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <span v-if="index === breadcrumbList.length - 1" class="flex-center">
            <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" />
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)" class="flex-center">
            <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" />
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useLayoutConfigStore } from "@/stores/layoutConfig";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";
import { ref, onMounted } from "vue";
const layoutConfig = useLayoutConfigStore();
const route = useRoute();
const router = useRouter();
const breadcrumbList = ref<RouteRecordNormalized[]>([]);
onMounted(() => {
  getBreadcrumb(route);
});
onBeforeRouteUpdate((to) => {
  getBreadcrumb(to);
});

function getBreadcrumb(to: RouteLocationNormalized) {
  const matched = to.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.isBreadcrumb !== false
  );
  breadcrumbList.value = matched || [];
}

function handleLink(_route: RouteRecordNormalized) {
  const { redirect, path } = _route;
  if (redirect) router.push(<string>redirect);
  else router.push(path);
}

function handleChangeCollapse() {
  layoutConfig.isCollapse = !layoutConfig.isCollapse;
}
</script>
<style scoped lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
