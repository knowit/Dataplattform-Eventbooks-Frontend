<template>
  <div class="container margin-top">
    <div class="header clickable" @click="isExpanded = !isExpanded">
      <div class="title">{{title}}</div>
      <img class="dropdown-button" :class="{show: isExpanded}"  src="@/assets/dropdown_arrow.svg" />
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
table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}
.title {
  display: flex;
  font: Bold 20px/26px Roboto;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
  margin-right: auto;
}

.dropdown-button {
  width: 1rem;
  height: 1rem;
  float: right;
  margin: 7px 2px 0 0;
  transform: rotate(180deg);
}

.show {
  transform: rotate(0deg);
}

@media only screen and (max-width: 580px) {
  table {
    width: 100vw;
    transform: translateX(-1rem);
  }
}
</style>
