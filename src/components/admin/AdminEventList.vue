<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">{{title}}</div>
      <img class="hide-show-button" :class="{show: isExpanded}" @click="isExpanded = !isExpanded" src="@/assets/plus.svg" />
    </div>
    <div v-if="isExpanded">
      <table v-if="isMobile">
        <admin-event-item-mobile v-for="e in events" :key="e.id" :type="type" :event="e" @show="onShow" />
      </table>
      <table v-else>
        <admin-event-item v-for="e in events" :key="e.id" :type="type" :event="e" @show="onShow" />
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import AdminEventItem, { RowType } from './AdminEventItem.vue';
import AdminEventItemMobile from './AdminEventItemMobile.vue';
import Event from '@/models/event.model';

@Component({
  components: {
    AdminEventItem,
    AdminEventItemMobile
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
  private windowWidth: number = window.innerWidth;

  @Emit('show')
  private onShow(id: string): string {
    return id;
  }

  private get isMobile() {
    return this.windowWidth <= 580;
  }

  private mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

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
table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
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

@media only screen and (max-width: 580px) {
  table {
    width: 100vw;
    transform: translateX(-1rem);
  }
}
</style>
