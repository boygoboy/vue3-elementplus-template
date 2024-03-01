<template>
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-wrap">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <div>
              <keep-alive :include="['SystemMenu']">
                <component :is="Component"></component>
              </keep-alive>
            </div>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  height: 100%;
}
.layout-main {
  overflow-x: hidden;
}
</style>
