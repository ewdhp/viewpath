<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.message {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
}
</style>
