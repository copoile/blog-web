<template>
  <div id="app">
    <router-view />
    <!-- <live2d /> -->
  </div>
</template>

<script>
import Live2d from '@/components/Live2d/index.vue'
import ResizeMixin from '@/components/mixin/ResizeHandler.js'
export default {
  name: 'App',
  components: {
    Live2d
  },
  mixins: [ResizeMixin]
}
</script>
