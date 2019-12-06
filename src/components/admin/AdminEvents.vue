<template>
  <div class="container">
    <admin-event-list title="Aktive nå" :events="this.active" />
    <admin-event-list title="Kommende eventer" :events="this.future" />
    <admin-event-list title="Tidligere eventer" :events="this.past" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AdminEventList from './AdminEventList.vue';
import Event from '../../models/event.model';

@Component({
  components: {
    AdminEventList
  }
})
export default class AdminEvents extends Vue {
  private searchTerm: string = '';

  private event: Event = this.createEvent();

  private active: Event[] = [this.createEvent(), this.createEvent()];
  private future: Event[] = [this.createEvent(), this.createEvent()];
  private past: Event[] = [this.createEvent(), this.createEvent()];

  // Helper
  private createEvent(): Event {
    const e = new Event();
    e.id = 'idhei';
    e.timestampFrom = new Date();
    e.timestampTo = new Date();
    e.eventSummary = 'summary';
    e.active = true;
    e.eventId = 'ABCDE';
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
