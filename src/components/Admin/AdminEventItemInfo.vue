<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">{{event.eventName}}</div>
      <img class="exit-button" @click="onClickButton" src="@/assets/plus.svg" />
    </div>
    <div class="row">
      <div class="description column">Dato: {{date}}</div>
      <div class="description">Eventboks: {{event.eventButtonName}}</div>
    </div>
    <div class="row">
      <div class="description column">Tid: {{startTime}} - {{endTime}}</div>
      <div class="description">Eventkode: {{event.eventId ? event.eventId : ''}}</div>
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

  private get date() {
    return this.event.timestampFrom!.toLocaleDateString([], {});
  }

  private get startTime() {
    return this.event.timestampFrom!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private get endTime() {
    return this.event.timestampTo!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  @Emit('toggle')
  private onClickButton() { }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
.container {
  margin-left: 3px;
}
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.title {
  display: flex;
  font: Bold 20px/24px Roboto;
  font-size: 15px;
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
