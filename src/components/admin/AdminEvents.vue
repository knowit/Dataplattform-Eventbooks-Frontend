<template>
  <div class="container">
    <div class="edit-event-response">{{editEventResponse}}</div>
    <admin-edit-event v-if="showEdit" :event="this.editEvent" :key="this.editEvent ? this.editEvent.id : 0" @cancel="onCancel" @finished="onFinished"/>
    <button class="create-event-button clickable" v-else @click="onCreate">Opprett event</button>
    <admin-current-event title="Pågår nå" :event="this.active" @edit="onEdit" />
    <admin-event-list title="Mine kommende eventer" :events="this.future" :type="type[0]" @edit="onEdit" />
    <admin-event-item-info v-if="showEvent" :event="this.showEvent" @toggle="onToggle" />
    <admin-event-list class="clickable" v-else title="Mine tidligere eventer" :events="this.past" :type="type[1]" @show="onShow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import AdminEventList from './AdminEventList.vue';
import Event from '@/models/event.model';
import AdminCurrentEvent from './AdminCurrentEvent.vue';
import AdminEventItemInfo from './AdminEventItemInfo.vue';
import { RowType } from './AdminEventItem.vue';
import AdminEditEvent from './EditEvent/AdminEditEvent.vue';

//TODO: Remove with helper
import EventFeedback, { FeedbackDetails } from '@/models/eventFeedback.model';
import EventBox from '@/models/eventBox.model';
import { ZonedDateTime } from '@js-joda/core';

@Component({
  components: {
    AdminEventList,
    AdminCurrentEvent,
    AdminEventItemInfo,
    AdminEditEvent
  }
})
export default class AdminEvents extends Vue {
  private searchTerm: string = '';

  private showEdit: boolean = false;
  private editEvent: Event | null = null;
  private showEvent: Event | null = null;
  private editEventResponse: string = '';

  private active: Event = this.createEvent();
  private future: Event[] = [this.createEvent(), this.createEvent()];
  private past: Event[] = [this.createEvent(), this.createEvent()];

  private details: boolean = false;

  private type = [RowType.FUTURE, RowType.FINISHED];

  private onToggle() {
    this.showEvent = null;
  }

  private onShow(id: string) {
    const event = this.findPastEvent(id);
    this.showEvent = event ? event : null;
  }

  private onCreate() {
    this.showEdit = !this.showEdit;
  }

  private onEdit(id: string) {
    const event = this.findFutureEvent(id);
    this.editEvent = event ? event : null;
    this.showEdit = true;

  }
  // Handles output message from EditEvent component
  private onFinished(message: string) {
    this.showEdit = false;
    this.editEvent = null;
    this.editEventResponse = message;
    setTimeout(() => {
      this.editEventResponse = '';
    }, 5000);

  }
  private onCancel() {
    this.showEdit = false;
    this.editEvent = null;
  }

  private findPastEvent(id: string): Event | null {
    const event = this.past.find(event => {
      if (event.id === id) {
        return event;
      }
    });
    return event ? event : null;
  }
  private findFutureEvent(id: string): Event | null {
    const event = this.future.concat(this.active).find(event => {
      if (event.id === id) {
        return event;
      }
    });
    return event ? event : null;
  }

  // Helper
  private createEvent(): Event {
    const e = new Event();
    e.id = 'id' + Math.floor(Math.random() * 1000);
    e.creator = 'Admin';
    e.timestampFrom = ZonedDateTime.now();
    e.timestampTo = ZonedDateTime.now().plusHours(1);
    e.eventName = 'Navn på event';
    e.active = true;
    e.eventLocation = 'Her';
    e.eventId = '12345';
    e.eventBoxes = [
      new EventBox(),
      new EventBox()
    ];
    e.eventBoxes[0].eventBoxName = 'Alpha';
    e.eventBoxes[0].eventBoxId = 'id1';
    e.eventBoxes[1].eventBoxName = 'Bravo';
    e.eventBoxes[1].eventBoxId = 'id2';
    e.eventFeedback = new EventFeedback();
    e.eventFeedback.negativeCount = 12;
    e.eventFeedback.neutralCount = 8;
    e.eventFeedback.positiveCount = 54;
    e.eventFeedback.details = [
      new FeedbackDetails(),
      new FeedbackDetails(),
      new FeedbackDetails()
    ];
    e.eventFeedback.details[0].comment = 'Lorem Ipsum Dolor Sit Amet';
    e.eventFeedback.details[0].vote = 1;
    e.eventFeedback.details[1].comment = 'The quick brown fox jumps over the lazy dogfox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog fox jumps over the lazy dog'.repeat(
      10
    );
    e.eventFeedback.details[1].vote = -1;
    e.eventFeedback.details[2].comment =
      'The difference is that an element with v-show will always be rendered and remain in the DOM; v-show only toggles the display CSS property of the element.';
    e.eventFeedback.details[2].vote = 0;
    return e;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30em;
}
.margin-top {
  margin-top: 22px;
}
.create-event-button {
  background: #4573e3 0% 0% no-repeat padding-box;
  border-radius: 2px;
  border: none;
  width: 100%;
  text-align: center;
  font: 15px/20px Roboto;
  letter-spacing: 0;
  color: #ffffff;
  height: 42px;
  margin-bottom: 22px;
}

::v-deep .header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
::v-deep .clickable {
  cursor: pointer;
}
.edit-event-response {
  width: 100%;
  text-align: center;
  margin: 0px 0 22px 0;
}

@media only screen and (max-width: 580px) {
  .container {
    width: 18em;
    overflow-x: hidden;
  }
}
</style>
