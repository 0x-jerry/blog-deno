<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="count">
    <h3>count 组件</h3>
    <div>
      count: {{ count }}
      <button class="btn" @click="count++">+</button>
      <button class="btn" @click="count--">-</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  @apply shadow px-5 mx-3 py-1;
}
</style>
