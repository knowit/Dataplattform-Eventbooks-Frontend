<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">{{title}}</div>
      <img class="hide-show-button" :class="{show: isExpanded}" @click="isExpanded = !isExpanded" src="@/assets/plus.svg" />
    </div>
    <table v-if="isExpanded">
      <admin-event-item v-for="e in events" :key="e.id" :type="type" :event="e" @show="onShow" />
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import AdminEventItem, { RowType } from './AdminEventItem.vue';
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
  @Prop()
  private type!: RowType;

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
  border-collapse: collapse;
}
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.title {
  display: flex;
  font: Bold 20px/26px Roboto;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
  margin-right: auto;
}

.hide-show-button {
  width: 1.5rem;
  height: 1.5rem;
  float: right;
  cursor: pointer;
}

.show {
  transform: rotate(45deg);
}
</style>
