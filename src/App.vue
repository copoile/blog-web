<template>
  <div id="app">
    <router-view />
    <live2d />
  </div>
</template>

<script>
import Live2d from '@/components/Live2d/index.vue'
export default {
  name: 'App',
  components: {
    Live2d
  }
}
</script>
