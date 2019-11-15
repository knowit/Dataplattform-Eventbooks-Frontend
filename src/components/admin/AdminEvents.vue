<template>
  <div class="container">
    <admin-search-bar v-model="searchTerm"/>
    <admin-event-list title="Aktiv nå"/>
    <admin-event-list title="Kommende eventer"/>
    <admin-event-list title="Tidligere eventer"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AdminSearchBar from './AdminSearchBar.vue';
import AdminEventList from './AdminEventList.vue';

@Component({
  components: {
    AdminSearchBar,
    AdminEventList
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
