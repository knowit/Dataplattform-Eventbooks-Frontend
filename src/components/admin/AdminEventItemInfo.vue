<template>
  <div class="container margin-top">
    <div class="header clickable margin-bottom" @click="onClickButton">
      <div class="title">{{ event.eventName }}</div>
      <img class="exit-button" src="@/assets/plus.svg" />
    </div>
    <div class="row">
      <div class="description column">Dato: {{ date }}</div>
      <div class="description">Eventboks: {{ eventBoxes }}</div>
    </div>
    <div class="row">
      <div class="description column">Tid: {{ startTime }} - {{ endTime }}</div>
      <div class="description">
        Eventkode: {{ event.eventCode ? event.eventCode : "" }}
      </div>
    </div>
    <admin-event-votes :event="this.event" />
    <admin-event-feedback :feedback="this.event.eventFeedback" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import AdminEventItem from './AdminEventItem.vue';
import Event from '@/models/event.model';
import AdminEventVotes from './AdminEventVotes.vue';
import AdminEventFeedback from './AdminEventFeedback.vue';
import { DateTimeFormatter } from '@js-joda/core';

@Component({
  components: {
    AdminEventItem,
    AdminEventVotes,
    AdminEventFeedback
  }
})
export default class AdminEventItemInfo extends Vue {
  @Prop()
  private title!: string;
  @Prop()
  private event!: Event;
  private isActive: boolean = true;

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

  @Emit('toggle')
  private onClickButton() { }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
.margin-bottom{
  margin-bottom: 10px;
}
.title {
  display: flex;
  font: Bold 20px/26px Roboto;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
}

.name {
  text-align: left;
  font: Italic 20px/26px Roboto;
  letter-spacing: 0;
  color: #212121;
  margin-right: 5px;
}

.description {
  text-align: left;
  font: Regular 18px/14px Roboto;
  letter-spacing: 0;
  color: #212121;
  padding: 1px 0px 1px 0px;
}
.row {
  display: flex;
}
.column {
  width: 150px;
}
.exit-button {
  transform: rotate(45deg);
}
</style>
