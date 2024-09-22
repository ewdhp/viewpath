<template>
  <component :is="componentName" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      required: true,
    },
  },
};
</script>
