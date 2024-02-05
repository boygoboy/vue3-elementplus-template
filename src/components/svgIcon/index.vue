<template>
  <render />
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
const props = withDefaults(
  defineProps<{
    name?: string;
    color?: string;
    size?: number;
  }>(),
  {
    name: "",
    size: 18,
  }
);
const render = () => {
  if (props.name?.startsWith("ele-")) {
    return h(
      resolveComponent("el-icon"),
      { color: props.color, size: props.size },
      () => h(resolveComponent(props.name))
    );
  } else {
    return h("i");
  }
};
</script>
