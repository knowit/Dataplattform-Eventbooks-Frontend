<template>
  <div class="container">
    <admin-current-event title="Pågår nå" :event="this.active" />
    <admin-event-list title="Mine kommende eventer" :events="this.future" />
    <admin-event-list title="Mine tidligere eventer" :events="this.past" @show="onShow"/>
    <admin-event-item-info :event="this.showEvent" @toggle="onToggle" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import AdminEventList from './AdminEventList.vue';
import Event from '../../models/event.model';
import AdminCurrentEvent from './AdminCurrentEvent.vue';
import AdminEventItemInfo from './AdminEventItemInfo.vue';

@Component({
  components: {
    AdminEventList,
    AdminCurrentEvent,
    AdminEventItemInfo
  }
})
export default class AdminEvents extends Vue {
  private searchTerm: string = '';

  private showEvent: Event = this.createEvent();
  

  private active: Event = this.createEvent();
  private future: Event[] = [this.createEvent(), this.createEvent()];
  private past: Event[] = [this.createEvent(), this.createEvent()];

  private details: boolean = false;

  private onToggle() {
    this.details = !this.details;
  }
  
  private onShow(id: string) {
    const event = this.past.find((event) => {
      if (event.id === id) {
        return event;
      }
    });
    this.showEvent = event;
  }

  // Helper
  private createEvent(): Event {
    const e = new Event();
    e.id = 'idhei' + Math.floor(Math.random()*100);
    e.timestampFrom = new Date();
    e.timestampTo = new Date();
    e.eventSummary = 'Navn på event';
    e.active = true;
    e.eventId = 'ABCDE';
    e.eventButtonName = 'Charlie';
    e.negativeCount = 12;
    e.neutralCount = 8;
    e.positiveCount = 54;
    return e;
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
</style>
