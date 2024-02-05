<template>
  <el-scrollbar>
    <el-menu
      router
      :default-active="$route.path"
      background-color="transparent"
      :default-openeds="['/system']"
      :collapse="isCollapse"
    >
      <el-menu-item index="/home">
        <el-icon><ele-HomeFilled></ele-HomeFilled></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="/system">
        <template #title>
          <el-icon><ele-Setting></ele-Setting></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/menu">
          <template #title>
            <el-icon><ele-Menu /></el-icon>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <template #title>
            <el-icon><ele-IceCream /></el-icon>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/user">
          <template #title>
            <el-icon><ele-User /></el-icon>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/goods">
        <template #title>
          <el-icon><ele-Goods /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/list">
          <template #title>
            <el-icon><ele-GoodsFilled /></el-icon>
            <span>商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/goods/category">
          <template #title>
            <el-icon><ele-Operation /></el-icon>
            <span>商品分类</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/401">
        <SvgIcon name="ele-Warning" />
        <span>401页面</span>
      </el-menu-item>
      <el-menu-item index="/mengxuegu">
        <el-icon><ele-Link /></el-icon>
        <template #title>
          <span>慕课网</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLayoutConfigStore } from "@/stores/layoutConfig";
const layoutConfig = useLayoutConfigStore();
const { isCollapse } = storeToRefs(layoutConfig);
</script>
<style scoped></style>
