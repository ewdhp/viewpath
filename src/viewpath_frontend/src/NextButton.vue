<template>
  <button @click="handleClick">Next</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('navigate');
    },
  },
};
</script>
