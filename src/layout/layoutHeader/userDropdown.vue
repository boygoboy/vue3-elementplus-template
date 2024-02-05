<template>
  <div class="layout-header-user">
    <div class="layout-header-user-icon mr5" @click="handletoggleFullscreen">
      <SvgIcon name="ele-FullScreen"></SvgIcon>
    </div>
    <div class="layout-header-user-icon mr5">
      <el-switch
        inline-prompt
        active-icon="ele-Moon"
        inactive-icon="ele-Sunny"
        style="--el-switch-on-color: #333"
        v-model="isDark"
        @change="changeDark"
      ></el-switch>
    </div>
    <el-dropdown>
      <span class="user-dropdown-link">
        <el-avatar class="mr3" :size="30" icon="ele-UserFilled" />
        admin
        <SvgIcon class="ml3" name="ele-ArrowDown"></SvgIcon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="router.push('/')">首页</el-dropdown-item>
          <el-dropdown-item @click.prevent="router.push('/404')"
            >404</el-dropdown-item
          >
          <el-dropdown-item @click.prevent="router.push('/401')"
            >401</el-dropdown-item
          >
          <el-dropdown-item divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useFullscreen, useDark } from "@vueuse/core";
import { useLayoutConfigStore } from "@/stores/layoutConfig";
const layoutConfig = useLayoutConfigStore();
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
const router = useRouter();

const isDark = useDark({
  initialValue: "dark",
});

function changeDark(_isDark: boolean) {
  layoutConfig.isDark = _isDark;
}

async function handletoggleFullscreen() {
  await toggleFullscreen();
  layoutConfig.isFullscreen = isFullscreen.value;
}
</script>
<style scoped></style>
