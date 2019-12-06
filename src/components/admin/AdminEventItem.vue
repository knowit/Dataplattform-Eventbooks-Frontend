<template>
  <tr class="container">
    <td class="event-date">{{date}}</td>
    <td class="event-time">{{startTime}}-{{endTime}}</td>
    <td class="event-name">{{event.eventSummary}}</td>
    <td class="event-id">{{event.eventId ? event.eventId : ''}}</td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop } from 'vue-property-decorator';

import Event from '@/models/event.model';

@Component({})
export default class AdminEventItem extends Vue {
  @Prop()
  private event!: Event;

  private get isNow() {
    return false;
  }
  private get isActive() {
    return false;
  }
  private get isFinished() {
    return false;
  }

  private get date() {
    return this.event.timestampFrom!.toLocaleDateString();
  }

  private get startTime() {
    return this.event.timestampFrom!.toLocaleTimeString();
  }

  private get endTime() {
    return this.event.timestampTo!.toLocaleTimeString();
  }


}
</script>

<style scoped>
.container {
  display: flex;
  text-align: left;
  width: 100%;
  font: regular 15px/14px "Roboto";
  letter-spacing: 0;
  color: #212121;
}

.event-date-time {
  display: flex;
  justify-content: left;
  flex-direction: row;
}

.event-time {
  margin-left: 1.25rem;
  white-space: nowrap;
}
.event-name {
  font: Italic 15px/14px Roboto;
  margin-left: 1.333rem;
  margin-right: 7rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10rem;
}
.event-id {
  font-style: italic;
}

tr:nth-child(even) {
  background-color: #f5f5f3;
}
</style>
