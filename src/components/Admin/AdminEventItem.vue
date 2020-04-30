<template>
  <tr id="container" @click="onClickItem">
    <td class="event-date">{{ date }}</td>
    <td class="event-time">{{ startTime }}-{{ endTime }}</td>
    <td class="event-name-wrapper" v-if="type === 1">
      <div class="event-name"> {{ event.eventName }} </div>
      &ndash; {{ eventBoxes }}
    </td>
    <td class="event-name-wrapper event-name" v-else>{{ event.eventName }}</td>
    <td class="event-code" v-if="type === 1">
      {{ event.eventCode ? event.eventCode : "" }}
    </td>
    <td class="edit-button clickable" v-if="type === 1">
      <img src="@/assets/edit-symbol.svg" @click="onEdit" />
    </td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop } from 'vue-property-decorator';

import Event from '@/models/event.model';

import { ZonedDateTime, DateTimeFormatter } from '@js-joda/core';

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
    return first.length ? first.join(', ') + ' & ' + last : last;
  }

  private get date() {
    return DateTimeFormatter.ofPattern('dd.MM').format(
      this.event.timestampFrom!
    );
  }

  private get startTime() {
    return DateTimeFormatter.ofPattern('HH:mm').format(
      this.event.timestampFrom!
    );
  }

  private get endTime() {
    return DateTimeFormatter.ofPattern('HH:mm').format(this.event.timestampTo!);
  }
  private onClickItem() {
    if (this.type === RowType.FINISHED) {
      this.$emit('show', this.event.id);
    }
  }
  private onEdit() {
    this.$emit('edit', this.event.id);
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
}

.event-date-time {
  display: flex;
  justify-content: left;
  flex-direction: row;
}

.event-time {
  margin-left: 0.5rem;
  white-space: nowrap;
}
.event-name {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0.3rem;
}
.event-name-wrapper {
  display: flex;
  margin-left: 0.5rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  min-width: 13.3rem;
  margin-right: 0.5rem;
}
.event-code {
  font-style: italic;
  margin-right: 5px;
  margin-left: auto;
}

tr:nth-child(odd) {
  background-color: #f5f5f3;
}
</style>
