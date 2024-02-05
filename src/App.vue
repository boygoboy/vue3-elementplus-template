<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import { Local } from "@/utils/storage";
import { useLayoutConfigStore } from "@/stores/layoutConfig";
const layoutConfigStore = useLayoutConfigStore();

onMounted(() => {
  const layoutConfigState = Local.get("layoutConfig");
  if (layoutConfigState) layoutConfigStore.updateState(layoutConfigState);
});
</script>

<template>
  <div class="h100">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
