<template>
  <div class="container">
    <h1>{{title}}</h1>
    <admin-event-item/>
    <admin-event-item v-bind:isNow="true" v-bind:isActive="true"/>
    <admin-event-item v-bind:isNow="true" v-bind:isActive="false"/>
    <admin-event-item v-bind:isFinished="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AdminEventItem from './AdminEventItem.vue';

@Component({
  components: {
    AdminEventItem
  }
})
export default class AdminEventList extends Vue {
  @Prop()
  private title!: string;
}
</script>

<style scoped>
.container {
  margin-left: 3px;
}
h1 {
  font: bold 15px/18px 'Roboto';
  font-size: 15px;
  letter-spacing: 0;
  color: #707070;
  opacity: 1;
}
</style>
