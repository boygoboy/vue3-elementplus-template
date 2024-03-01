<template>
  <el-drawer
    :title="title + '菜单'"
    v-model="visible"
    :before-close="close"
    direction="rtl"
    size="650px"
  >
    <el-form
      v-loading="loading"
      ref="formRef"
      label-position="right"
      status-icon
      label-suffix=":"
      :model="formData"
      label-width="85px"
    >
      <el-form-item label="上级菜单" prop="parentId">
        <el-cascader
          v-model="formData.parentId"
          :options="menuList"
          :props="{
            checkStrictly: true,
            emitPath: true,
            value: 'id',
            label: 'title',
          }"
          clearable
          placeholder="请选择上级菜单"
          class="w100"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item
        label="菜单类型"
        prop="type"
        :rules="{
          required: true,
          message: '请选择菜单类型',
          trigger: 'change',
        }"
      >
        <el-radio v-model="formData.type" label="1" border>菜单</el-radio>
        <el-radio v-model="formData.type" label="2" border>按钮</el-radio>
      </el-form-item>
      <el-form-item
        label="菜单名称"
        prop="meta.title"
        :rules="{ required: true, message: '请输入菜单名称', trigger: 'blur' }"
      >
        <el-input
          v-model="formData.meta.title"
          placeholder="请输入菜单名称"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <template v-if="formData.type == '2'">
        <el-form-item label="权限标识" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入权限标识"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="路由地址" prop="path">
          <el-input
            v-model="formData.path"
            placeholder="请输入路由地址"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="路由名称"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input
            v-model="formData.component"
            placeholder="路由组件相对路径"
            maxlength="390"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="meta.icon">
          <el-input
            v-model="formData.meta.icon"
            placeholder="请输入图标名 ele- 开头"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input
            v-model="formData.redirect"
            placeholder="路由重定向redirect值"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否隐藏"
              prop="meta.hidden"
              :rules="{ required: true, message: '请选择', trigger: 'change' }"
            >
              <el-radio-group v-model="formData.meta.hidden">
                <el-radio :label="false">不隐藏</el-radio>
                <el-radio :label="true">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否缓存"
              prop="meta.cache"
              :rules="{ required: true, message: '请选择', trigger: 'change' }"
            >
              <el-radio-group v-model="formData.meta.cache">
                <el-radio :label="false">不缓存</el-radio>
                <el-radio :label="true">缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="10000"
          style="width: 300px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="formData.remark"
          placeholder="请输入备注"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row justify="center" class="mt10">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-row>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup name="SystemMenuEdit">
import { ref, reactive, toRefs } from "vue";
import { getMenuSelect, add, update } from "@/api/system/menu";
import { notify } from "@/utils/element";
const emit = defineEmits(["refresh"]);
const formRef = ref();
const initData = { type: "1", sort: 1, meta: { hidden: false, cache: true } };
const state = reactive({
  title: "新增",
  type: "add" as FormType,
  visible: false,
  loading: false,
  menuList: [],
  formData: {} as SysMenuType,
});

const { title, visible, loading, formData, menuList } = { ...toRefs(state) };

defineExpose({ open });
function open(type: FormType, title: string, data = {} as any) {
  state.title = title;
  state.type = type;
  state.formData = JSON.parse(JSON.stringify({ ...initData, ...data }));
  state.visible = true;
  loadMenuSelect();
}

async function loadMenuSelect() {
  const { code, data } = await getMenuSelect();
  if (code != 20000) return;
  state.menuList = data;
}
function close() {
  if (state.loading) return;
  formRef.value?.resetFields();
  state.visible = false;
}

function submitForm() {
  formRef.value?.validate((valid: any) => {
    if (!valid) {
      return;
    }
    if (state.formData.type == "2") {
      state.formData.path = "";
      state.formData.name = "";
      state.formData.component = "";
      state.formData.redirect = "";
      state.formData.meta.icon = "";
      state.formData.meta.hidden = false;
      state.formData.meta.cache = false;
    }
    submitData();
  });
}

async function submitData() {
  try {
    state.loading = true;
    let res;
    if (state.type == "edit") {
      res = await update(state.formData);
    } else {
      res = await add(state.formData);
    }
    state.loading = false;
    if (res.code == 20000) {
      notify("操作成功！", { type: "success" });
      close();
      emit("refresh");
    }
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
</script>
