<template>
  <div class="container">
    <admin-current-event title="Pågår nå" :event="this.active" />
    <admin-event-list title="Mine kommende eventer" :events="this.future" />
    <admin-event-item-info v-if="showEvent" :event="this.showEvent" @toggle="onToggle" />
    <admin-event-list id="past" v-else title="Mine tidligere eventer" :events="this.past" @show="onShow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import AdminEventList from './AdminEventList.vue';
import Event from '@/models/event.model';
import AdminCurrentEvent from './AdminCurrentEvent.vue';
import AdminEventItemInfo from './AdminEventItemInfo.vue';

//TODO: Remove with helper
import EventFeedback, { FeedbackDetails } from '@/models/eventFeedback.model';
import EventBox from '@/models/eventBox.model';

@Component({
  components: {
    AdminEventList,
    AdminCurrentEvent,
    AdminEventItemInfo
  }
})
export default class AdminEvents extends Vue {
  private searchTerm: string = '';

  private showEvent: Event | null = null;

  private active: Event = this.createEvent();
  private future: Event[] = [this.createEvent(), this.createEvent()];
  private past: Event[] = [this.createEvent(), this.createEvent()];

  private details: boolean = false;

  private onToggle() {
    this.showEvent = null;
  }

  private onShow(id: string) {
    const event = this.past.find((event) => {
      if (event.id === id) {
        return event;
      }
    });
    this.showEvent = event ? event : null;
  }

  // Helper
  private createEvent(): Event {
    const e = new Event();
    e.id = 'idhei' + Math.floor(Math.random() * 100);
    e.timestampFrom = new Date();
    e.timestampTo = new Date();
    e.eventName = 'Navn på event';
    e.active = true;
    e.eventId = 'ABCDE';
    e.eventBoxes = [new EventBox()];
    e.eventBoxes[0].eventBoxName = 'Charlie';
    e.eventFeedback = new EventFeedback();
    e.eventFeedback.negativeCount = 12;
    e.eventFeedback.neutralCount = 8;
    e.eventFeedback.positiveCount = 54;
    e.eventFeedback.details = [new FeedbackDetails(), new FeedbackDetails()];
    e.eventFeedback.details[0].comment = 'Lorem Ipsum Dolor Sit Amet';
    e.eventFeedback.details[0].vote = 1;
    e.eventFeedback.details[1].comment = 'The quick brown fox jumps over the lazy dogfox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog';
    e.eventFeedback.details[1].vote = -1;
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

#past {
  cursor: pointer;
}
</style>
