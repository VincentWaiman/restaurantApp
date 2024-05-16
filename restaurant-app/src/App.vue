<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from './components/sidebar/state';

export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth };
  },
  computed: {
    isNonAdminView() {
      return this.$route.name === 'nonadmin';
    },
    dynamicMarginLeft() {
      return this.isNonAdminView ? '0' : sidebarWidth;
    },
  },
};
</script>

<template>
  <div>
    <Sidebar v-if="!isNonAdminView" />
    <div :style="{ 'margin-left': isNonAdminView ? '0' : sidebarWidth }">
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  overflow-x: none;
}
</style>
