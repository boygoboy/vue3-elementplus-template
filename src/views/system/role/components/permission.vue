<template>
  <el-drawer
    :title="`分配【${role.roleName}】的权限`"
    direction="rtl"
    size="400px"
    v-model="visible"
    :before-close="close"
  >
    <div v-loading="loading">
      <el-tree
        ref="treeRef"
        node-key="id"
        show-checkbox
        highlight-current
        :data="menuList"
        :default-expand-all="expandAll"
        :props="{ children: 'children', label: 'meta' }"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <SvgIcon
              v-if="[1, 2].includes(node.level)"
              :name="data.meta.icon || 'ele-Menu'"
            ></SvgIcon>
            <el-icon v-else>
              <ele-Menu v-if="data.type == 1"></ele-Menu>
              <ele-SwitchButton v-else-if="data.type == 2"></ele-SwitchButton>
            </el-icon>
            <span class="pl10">{{ data.meta.title }}</span>
          </span>
        </template>
      </el-tree>
    </div>
    <template #footer>
      <el-button type="primary" :loading="submitting" @click="submitForm">
        提交</el-button
      >
      <el-button @click="handleCheckAll">全选/不选</el-button>
      <el-button @click="handleExpand">展开/收起</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, watch, nextTick } from "vue";
import { getList } from "@/api/system/menu";
import { getMenuIdsByRoleId, saveRoleMenu } from "@/api/system/role";
import { msg, notify } from "@/utils/element";
import type Node from "element-plus/es/components/tree/src/model/node";
const treeRef = ref();
const state = reactive({
  visible: false,
  loading: false,
  checked: false,
  expandAll: false,
  role: {} as SysRoleType,
  menuIds: [] as string[],
  menuList: [],
  submitting: false,
});
const {
  visible,
  loading,
  checked,
  expandAll,
  role,
  menuIds,
  menuList,
  submitting,
} = { ...toRefs(state) };

defineExpose({
  open,
});

async function open(role: SysRoleType) {
  state.visible = true;
  state.role = role;
  await loadMenuList();
  await loadRoleMenuIds();
  checkedOldMenuNode();
}

function close() {
  if (state.submitting) return msg("正在提交中，无法关闭窗口");
  state.menuIds = [];
  state.menuList = [];
  state.checked = false;
  state.visible = false;
  state.expandAll = false;
}

async function loadMenuList() {
  try {
    state.loading = true;
    const { data } = await getList();
    state.menuList = data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
}

async function loadRoleMenuIds() {
  try {
    state.loading = true;
    const { data } = await getMenuIdsByRoleId(state.role.id);
    state.menuIds = data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
function checkedOldMenuNode() {
  nextTick(() => {
    const { menuIds } = state;
    menuIds.forEach((id) => {
      const node = treeRef.value.getNode(id);
      if (node && node.isLeaf) {
        treeRef.value.setChecked(id, true);
      }
    });
  });
}

function handleCheckAll() {
  state.checked = !state.checked;
  if (state.checked) {
    treeRef.value?.setCheckedNodes(state.menuList);
  } else {
    treeRef.value?.setCheckedNodes([]);
  }
}

function handleExpand() {
  state.expandAll = !state.expandAll;
  changeTreeNodeStatus(treeRef.value.store.root);
}

function changeTreeNodeStatus(node: Node) {
  node.expanded = state.expandAll;
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = state.expandAll;
    if (node.childNodes[i].childNodes.length > 0) {
      changeTreeNodeStatus(node.childNodes[i]);
    }
  }
}

async function submitForm() {
  try {
    state.submitting = true;
    const checkedMenuIds = treeRef.value.getCheckedKeys();
    const parentIds = treeRef.value.getHalfCheckedKeys();
    const menuIds = parentIds.concat(checkedMenuIds);
    await saveRoleMenu(state.role.id, menuIds);
    notify("分配权限成功！", { type: "success" });
    state.submitting = false;
    close();
  } catch (error) {
  } finally {
    state.submitting = false;
  }
}
</script>
<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  flex: 1;
  font-size: 14px;
  align-items: center;
  padding-left: 8px;
}
</style>
