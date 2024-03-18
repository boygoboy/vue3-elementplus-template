<template>
  <div>
    <el-form
      :inline="true"
      :model="query"
      label-width="80px"
      label-suffix=":"
      class="mt20"
    >
      <el-form-item label="角色名称">
        <el-input
          v-model="query.name"
          placeholder="请输入角色名称"
          clearable
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" type="primary" @click="handleQuery"
          >查询</el-button
        >
        <el-button icon="ele-Plus" type="success" @click="handleAdd"
          >新增角色</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      ref="tableListRef"
      :data="tableList"
      border
      stripe
      style="height: calc(100vh - 200px)"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="roleName"
        label="角色名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="roleCode"
        label="角色编码"
      ></el-table-column>
      <el-table-column align="center" prop="status" label="角色状态">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'warning'">{{
            row.status ? "启用" : "停用"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="260">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            icon="ele-Check"
            @click="handlePermission(row)"
            >分配权限</el-button
          >
          <el-button
            link
            type="primary"
            icon="ele-Edit"
            @click="handleEdit(row)"
            >修改</el-button
          >
          <el-popconfirm
            width="auto"
            :title="`确定删除此角色和所拥有的权限吗？`"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button icon="ele-Delete" link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <m-page :page="page" @pageChange="queryData"></m-page>
    <RoleEdit ref="editRef" @refresh="queryData" />
    <Permission ref="permissionRef" />
  </div>
</template>

<script setup lang="ts" name="SystemRole">
import {
  reactive,
  toRefs,
  onMounted,
  ref,
  nextTick,
  defineAsyncComponent,
} from "vue";
import { getPageList, deleteById } from "@/api/system/role";
import { notify } from "@/utils/element";
const RoleEdit = defineAsyncComponent(
  () => import("@/views/system/role/components/role-edit.vue")
);
const Permission = defineAsyncComponent(
  () => import("@/views/system/role/components/permission.vue")
);
const permissionRef = ref();

const editRef = ref();
const state = reactive({
  loading: false,
  page: {
    current: 1,
    size: 20,
    total: 0,
  } as PageType,
  query: {
    name: "",
  } as SysRoleQuery,
  tableList: [] as SysRoleType[],
});
const { query, loading, page, tableList } = { ...toRefs(state) };

onMounted(() => {
  queryData();
});

async function queryData() {
  try {
    state.loading = true;
    const { current, size } = state.page;
    const { data } = await getPageList(state.query, current, size);
    state.tableList = [];
    nextTick(() => {
      state.tableList = data.records;
      state.page.total = data.total;
    });
  } catch (error) {
  } finally {
    state.loading = false;
  }
}

const tableListRef = ref();

function handleAdd() {
  editRef.value.open("add", "新增");
}

function handleEdit(row: SysRoleType) {
  editRef.value?.open("edit", "修改", row);
}

async function handleDelete(id: string) {
  try {
    state.loading = true;
    await deleteById(id);
    notify("删除成功！", { type: "success" });
    queryData();
  } catch (error) {
  } finally {
    state.loading = false;
  }
}

function handlePermission(role: SysMenuType) {
  permissionRef.value?.open(role);
}

function handleQuery() {
  state.page.current = 1;
  queryData();
}
</script>
