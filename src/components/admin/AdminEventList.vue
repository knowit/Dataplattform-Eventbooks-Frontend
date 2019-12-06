<template>
  <div class="container">
    <div class="wrapper">
      <h1>{{title}}</h1>
      <img class="hide-show-button" :class="{show: isExpanded}" @click="isExpanded = !isExpanded" src="@/assets/plus.svg" />
    </div>
    <table v-if="isExpanded">
      <admin-event-item v-for="e in events" :key="e.id" :event="e" />
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AdminEventItem from './AdminEventItem.vue';
import Event from '@/models/event.model';

@Component({
  components: {
    AdminEventItem
  }
})
export default class AdminEventList extends Vue {
  @Prop()
  private title!: string;
  @Prop()
  private events!: Event;

  private isExpanded: boolean = true;
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
.container {
  margin-left: 3px;
}
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
h1 {
  display: flex;
  font: Medium 20px/24px Roboto;
  font-size: 15px;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
}

.hide-show-button {
  width: 1.5rem;
  height: 1.5rem;
  float: right;
}

.show {
  transform: rotate(45deg);
}
</style>
