<script setup lang="ts">
defineProps<{
  title: string
}>();
</script>

<template>
  <div class="card__container">
    <div class="card__header">
      <h3>{{ title }}</h3>
    </div>
    <div class="card__content">
      <slot name="content"></slot>
    </div>
    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card__container {
  padding: 5px 40px 20px 40px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: linen;
  box-shadow: 5px 5px 0 0 rgb(149, 127, 105, .2);
}
</style>