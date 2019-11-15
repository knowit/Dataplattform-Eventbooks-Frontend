<template>
  <div class="container" :class="{ now: isNow }">
    <div class="event-active" v-if="isNow">
      <div class="event-active-indicator on" v-if="isActive" />
      <div class="event-active-indicator off" v-else />
    </div>
    <div class="event-date-time" v-else>
      <div class="event-date">{{date}}</div>
      <div class="event-time">{{startTime}}-{{endTime}}</div>
    </div>
    <div class="event-name">{{eventName}}</div>
    <div class="event-id">{{eventId}}</div>
    <div class="drop-down-icon" v-if="isFinished">
      <img src="../../assets/expand_less.svg" v-if="isExpanded"/>
      <img src="../../assets/expand_more.svg" v-else/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class AdminEventItem extends Vue {
  @Prop()
  private isNow!: boolean;
  @Prop()
  private isActive!: boolean;
  @Prop()
  private isFinished!: boolean;

  private isExpanded: boolean = false;

  private date: string = "12.34";
  private startTime: string = "11:11";
  private endTime: string = "12:34";
  private eventName: string = "Eventnavn - Charlie";
  private eventId: string = "12345";

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: left;
  flex-direction: row;
  width: 100%;
  font: normal 15px/14px 'Roboto';
  letter-spacing: 0;
  color: #696969;
}
.now {
  font: normal 20px/24px 'Roboto';
  color: #212121;
}
.event-date-time {
  margin-right: 20px;
  display: flex;
  justify-content: left;
  flex-direction: row;
}
.event-date {
  margin-right: 10px;
}
.event-time {
  white-space: nowrap
}
.event-name {
  margin-right: 20px;
  text-align: left;
}
.event-id {
  margin-left: auto;
  font-style: italic;
}
.event-active-indicator {
  margin-top: 1.8px;
  height: 0.9em;
  width: 0.9em;
  border-radius: 50%;
  border: 1.5px solid white;
  margin-right: 10px;
}
.on {
  background-color: #13A313;
}
.off {
  background-color: #D51919;
}
.drop-down-icon {
  width: 19px;
  height: 11px;
  opacity: 1;
  margin-left: 3px;
}
</style>
