<template>
  <div id="app">
    <router-view />
    <!-- <live2d v-if="device === 'desktop'" /> -->
    <live2d v-if="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Live2d from '@/components/Live2d/index.vue'
import ResizeMixin from '@/components/mixin/ResizeHandler.js'
export default {
  name: 'App',
  components: {
    Live2d
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'device'
    ])
  }
}
</script>
