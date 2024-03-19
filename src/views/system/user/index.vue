<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="query" label-suffix=":">
      <el-form-item>
        <el-input
          v-model.trim="query.keyword"
          clearable
          placeholder="请输入用户账号/昵称/手机号"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button icon="ele-Plus" type="success" @click="handleAdd">
          新增用户
        </el-button>
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
        fixed="left"
        align="center"
        prop="nickName"
        label="用户昵称"
        width="130"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户账号"
        min-width="90"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="email"
        label="邮箱"
      ></el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="accountNonLocked"
        width="105"
        label="账号锁定"
      >
        <template #default="{ row }">
          <el-tag v-if="row.accountNonLocked" effect="dark" type="success"
            >正常</el-tag
          >
          <el-tag v-else effect="dark" type="danger">锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="accountNonExpired"
        width="105"
        label="账号过期"
      >
        <template #default="{ row }">
          <el-tag v-if="row.accountNonExpired" effect="dark" type="success"
            >正常</el-tag
          >
          <el-tag v-else effect="dark" type="danger">过期</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="credentialsNonExpired"
        width="105"
        label="密码过期"
      >
        <template #default="{ row }">
          <el-tag v-if="row.credentialsNonExpired" effect="dark" type="success"
            >正常</el-tag
          >
          <el-tag v-else effect="dark" type="danger">过期</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        align="center"
        prop="createTime"
        label="创建时间"
        width="210"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="left"
        label="操作"
        width="260"
      >
        <template #default="{ row }">
          <el-button @click="handlePwd(row)" link icon="ele-Key" type="primary"
            >密码重置</el-button
          >
          <el-button
            @click="handleEdit(row)"
            link
            icon="ele-Edit"
            type="warning"
            >修改</el-button
          >
          <el-popconfirm
            @confirm="handleDelete(row.id)"
            :title="`确定永久删除【${row.nickName}】吗？`"
            width="auto"
          >
            <template #reference>
              <el-button link icon="ele-Delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <m-page :page="page" @pageChange="queryData"></m-page>
  </div>
</template>

<script lang="ts" setup name="SystemUser">
import useTablePage from "@/hooks/useTablePage";
import { getPageList, deleteById } from "@/api/system/user";
const {
  tableListRef,
  editRef,
  loading,
  query,
  page,
  tableList,
  queryData,
  handleQuery,
  handleDelete,
  handleAdd,
  handleEdit,
} = useTablePage<SysUserType, SysUserQuery>({ getPageList, deleteById });

function handlePwd(user: SysUserType) {}
</script>
