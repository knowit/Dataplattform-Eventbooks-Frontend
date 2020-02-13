<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="header">
      <div class="name">{{ event.eventName }}</div>
      <img v-if="isActive" class="toggle-button" @click="isActive = !isActive" src="@/assets/toggle-active.svg" />
      <img v-else class="toggle-button" @click="isActive = !isActive" src="@/assets/toggle-inactive.svg" />
    </div>
    <div class="description">
      Tid:
      <div class="content">{{ startTime }} - {{ endTime }}</div>
    </div>
    <div class="description">
      Eventkode:
      <div class="content">{{ event.eventId ? event.eventId : "" }}</div>
    </div>
    <div class="description space-between">
      <div>
        Eventboks:
        <div class="content" v-for="eb in event.eventBoxes" :key="eb.eventBoxName">
          {{ eb.eventBoxName }}<span v-if="isActive" class="indicator active"></span><span v-else class="indicator inactive"></span>
        </div>
      </div>
      <img class="edit-button clickable" src="@/assets/edit-symbol.svg" @click="onEdit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AdminEventItem from './AdminEventItem.vue';
import Event from '@/models/event.model';
import { DateTimeFormatter } from '@js-joda/core';

@Component({
  components: {
    AdminEventItem
  }
})
export default class AdminCurrentEvent extends Vue {
  @Prop()
  private title!: string;
  @Prop()
  private event!: Event;
  private isActive: boolean = true;

  private get startTime() {
    return DateTimeFormatter.ofPattern('HH:mm').format(
      this.event.timestampFrom!
    );
  }

  private get endTime() {
    return DateTimeFormatter.ofPattern('HH:mm').format(this.event.timestampTo!);
  }

  private get eventBoxes() {
    const names = this.event.eventBoxes!.map(eb => eb.eventBoxName);
    const first = names.slice(0, -1);
    const last = names.slice(-1)[0];
    return first.length ? first.join(', ') + ' & ' + last : last;
  }
  private onEdit() {
    this.$emit('edit', this.event.id);
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
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
  display: flex;
}
.content {
  display: inline;
  text-align: left;
  font: bold 16px/14px Roboto;
  letter-spacing: 0;
  color: #212121;
  padding-left: 3px;
}
.indicator {
  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 4px;
  margin-bottom: -1px;
}
.active {
  background-color: #13a313;
}
.inactive {
  background-color: #d51919;
}

.space-between {
  justify-content: space-between;
  width: 100%;
}
</style>
