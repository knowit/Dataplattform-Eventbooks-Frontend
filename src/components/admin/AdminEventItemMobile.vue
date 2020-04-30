<template>
  <tr id="container" @click="onClickItem">
    <div class="space-between">
      <td class="event-name">{{ event.eventName }}</td>
      <td class="edit-button clickable" v-if="type === 1">
        <img src="@/assets/edit-symbol.svg" @click="onEdit" />
      </td>
    </div>
    <td class="event-info">Dato: {{ date }}</td>
    <td class="event-info">Tid: {{ startTime }}-{{ endTime }}</td>
    <td class="event-info" v-if="type === 1">
      Eventkode: {{ event.eventCode ? event.eventCode : "" }}
    </td>
    <td class="event-info" v-if="type === 1">
      Eventboks: {{ eventBoxes }}
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
export default class AdminEventItemMobile extends Vue {
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
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  width: 100%;
  font: regular 15px/14px "Roboto";
  letter-spacing: 0;
  color: #212121;
  max-width: 100%;
  padding-left: 1rem;
}

.event-info {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 13.3rem;
}

.event-name {
  font-weight: bold;
  font-style: italic;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 13.3rem;
}

tr:nth-child(odd) {
  background-color: #f5f5f3;
}
.space-between {
  display: flex;
  justify-content: space-between;
  width: 18em;
}
</style>
