<template></template>

<script setup lang="ts" name="SystemUserEdit">
import useForm from "@/hooks/useForm";
import { ref, computed, watch } from "vue";
import { update, add } from "@/api/system/user";
const emit = defineEmits(["refresh"]);

const initData = {
  accountNonExpired: true,
  accountNonLocked: true,
  credentialNonExpired: true,
};
const {
  formRef,
  title,
  type,
  visible,
  loading,
  formData,
  oldFormData,
  open,
  close,
  submitForm,
} = useForm<SysUserType>({ initData, update, add }, emit);
defineExpose({
  open,
});
const disabled = computed(() => type.value === "edit");
</script>
