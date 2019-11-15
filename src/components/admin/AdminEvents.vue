<template>
  <div class="container">
    <admin-search-bar v-model="searchTerm"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AdminSearchBar from './AdminSearchBar.vue';

@Component({
  components: {
        AdminSearchBar
    }
})
export default class AdminEvents extends Vue {
  private searchTerm: string = '';
}
</script>

<style scoped>
.container {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30em;
}
</style>
