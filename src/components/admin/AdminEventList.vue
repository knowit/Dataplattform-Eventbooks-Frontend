<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">{{title}}</div>
      <img class="hide-show-button" :class="{show: isExpanded}" @click="isExpanded = !isExpanded" src="@/assets/plus.svg" />
    </div>
    <table v-if="isExpanded">
      <admin-event-item v-for="e in events" :key="e.id" :event="e" @show="onShow" />
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

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
  private events!: Event[];

  private isExpanded: boolean = true;

  @Emit('show')
  private onShow(id: string): string {
    return id;
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.title {
  display: flex;
  font: Bold 20px/24px Roboto;
  font-size: 15px;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
  margin-right: auto;
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
