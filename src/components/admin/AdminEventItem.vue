<template>
  <tr id="container" @click="onClickItem">
    <td class="event-date">{{date}}</td>
    <td class="event-time">{{startTime}}-{{endTime}}</td>
    <td class="event-name" v-if="type === 1">{{event.eventName}} - {{eventBoxes}}</td>
    <td class="event-name" v-else>{{event.eventName}}</td>
    <td class="event-id" v-if="type === 1">{{event.eventId ? event.eventId : ''}}</td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop } from 'vue-property-decorator';

import Event from '@/models/event.model';

export enum RowType {
  FINISHED = 0,
  FUTURE = 1,
  ACTIVE = 2
}

@Component({})
export default class AdminEventItem extends Vue {
  @Prop()
  private event!: Event;

  @Prop()
  private type!: RowType;

  private get eventBoxes() {
    const names = this.event.eventBoxes!.map(eb => eb.eventBoxName);
    const first = names.slice(0, -1);
    const last = names.slice(-1)[0];
    return first.length ? first.join(', ') + '& ' + last : last;
  }

  // Fix these to consider times and dates below
  private get isNow() {
    return false;
  }
  private get isActive() {
    return false;
  }
  private get isFinished() {
    return this.event.timestampTo!.getTime() < Date.now();
  }

  private get date() {
    // Fix to only display day and month
    return this.event.timestampFrom!.toLocaleDateString([], {});
  }
  private get startTime() {
    return this.event.timestampFrom!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private get endTime() {
    return this.event.timestampTo!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  private onClickItem() {
    if (this.isFinished) {
      this.$emit('show', this.event.id);
    }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  text-align: left;
  width: 100%;
  font: regular 15px/14px "Roboto";
  letter-spacing: 0;
  color: #212121;
  max-width: 29rem;
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
  margin-left: 1.333rem;

  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  min-width: 13.3rem;
}
.event-id {
  font-style: italic;
}

tr:nth-child(even) {
  background-color: #f5f5f3;
}
</style>
