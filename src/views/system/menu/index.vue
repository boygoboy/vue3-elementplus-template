<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="query" label-width="80px" label-suffix=":">
      <el-form-item label="菜单名称">
        <el-input
          v-model="query.keyword"
          placeholder="请输入菜单名称"
          clearable
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="ele-Search" @click="queryData"
          >查询</el-button
        >
        <el-button icon="ele-Plus" type="success" @click="handleAdd"
          >新增菜单</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="w100"
      ref="tableListRef"
      border
      stripe
      row-key="id"
      :data="tableList"
      @row-click="toggleRow"
      v-loading="loading"
    >
      <el-table-column header-align="center" align="left" label="菜单名称">
        <template #default="{ row }">
          <SvgIcon :name="row.meta?.icon || ''" />
          <span class="ml10">{{ row.meta?.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="path"
        label="路由地址"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="component"
        label="组件路径"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="code"
        label="权限标识"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column align="center" prop="type" label="类型" width="100">
        <template #default="{ row }">
          <el-tag effect="plain" :type="row.type == 1 ? '' : 'success'">
            {{ row.type == 1 ? "菜单" : "按钮" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
        width="100"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template #default="{ row }">
          <el-button
            v-if="row.type != '2'"
            link
            type="primary"
            icon="ele-Plus"
            @click.stop="handleAdd(row.id)"
            >新增下级</el-button
          >
          <el-button
            link
            type="warning"
            icon="ele-Edit"
            @click.stop="handleEdit(row)"
            >修改</el-button
          >
          <el-popconfirm
            width="auto"
            :title="`确定永久删除【${row.meta?.title}】吗？`"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button link type="danger" icon="ele-Delete" @click.stop
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <MenuEdit ref="editRef" @refresh="queryData" />
</template>
<script setup lang="ts" name="SystemMenu">
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from "vue";
import { getList, deleteById } from "@/api/system/menu";
import { notify } from "@/utils/element";

const MenuEdit = defineAsyncComponent(
  () => import("./components/menu-edit.vue")
);
const editRef = ref();

const state = reactive({
  loading: false,
  query: {
    keyword: "",
  } as SysMenuQuery,
  tableList: [] as SysMenuType[],
});

onMounted(() => {
  queryData();
});
const { loading, query, tableList } = { ...toRefs(state) };
async function queryData() {
  try {
    state.loading = true;
    const { data } = await getList(state.query);
    state.tableList = data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
}

const tableListRef = ref();
function handleAdd(parentId?: string) {
  editRef.value.open("add", "新增", { parentId });
}

function handleEdit(row: SysMenuType) {
  editRef.value.open("edit", "修改", row);
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

const toggleRow = (row: SysMenuType) => {
  tableListRef.value.toggleRowExpansion(row);
};
</script>
<style scoped></style>
