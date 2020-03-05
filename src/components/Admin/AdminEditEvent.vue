<template>
  <div class="container">
    <input class="input-name" placeholder="Hva skal eventet hete?" v-model="eventName" />
    <div class="wrapper">
      <div class="half">
        <div class="row baseline">
          <img class="svg clock" src="@/assets/clock.svg" />
          <date-picker class="clickable " v-model="date">
            <div class="date-time">{{ date.toLocaleDateString() }}</div>
          </date-picker>
          <time-picker :current-timestamp="this.startTime"/>
          &ndash;
          <time-picker :current-timestamp="this.endTime"/>
        </div>
        <div class="row location-row">
          <img class="svg" src="@/assets/position.svg" />
          <input class="input-location" placeholder="Hvor er eventet?" v-model="eventLocation" />
        </div>
        <div class="row">
          <img class="svg" src="@/assets/person.svg" />
          <div class="user">Pernille</div>
        </div>
      </div>
      <div class="row half right">
        <div class="column">
          <div class="eventbox" v-for="eb in eventBoxes" :key="eb.eventBoxName">
            <div>{{ eb.eventBoxName }}</div>
            <img class="cross clickable" @click="removeBox(eb.eventBoxId)" src="@/assets/plus.svg" />
          </div>
          <button @click="onAddBox" class="add-box blue clickable">
            <img class="plus" src="@/assets/plus.svg" />
            <div class="button-text">Legg til boks</div>
          </button>
        </div>
      </div>
    </div>
    <div class="option-buttons">
      <button class="cancel button clickable" @click="onCancel">Avbryt</button>
      <button class="blue button clickable">Opprett</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Event from '@/models/event.model';
import { ZonedDateTime, DateTimeFormatter, convert } from '@js-joda/core';
import EventBox from '../../models/eventBox.model';
import { DatePicker } from 'v-calendar';
import TimePicker from './TimePicker.vue';

@Component({
  components: { DatePicker, TimePicker }
})
export default class AdminEditEvent extends Vue {
  @Prop()
  private event?: Event;

  private date: Date = this.event
    ? convert(this.event.timestampFrom!).toDate()
    : convert(ZonedDateTime.now()).toDate();

  private eventBoxes: EventBox[] | undefined = this.event
    ? this.event.eventBoxes
    : [];

  private eventName: string | undefined = this.event
    ? this.event.eventName
    : '';
  private eventLocation: string | undefined = this.event
    ? this.event.eventLocation
    : '';

  private onCancel() {
    this.$emit('cancel');
  }

  private get startTime() {
    return this.event
      ? DateTimeFormatter.ofPattern('HH:mm').format(this.event.timestampFrom!)
      : this.getRoundedTimeString(15, ZonedDateTime.now());
  }

  private get endTime() {
    return this.event
      ? DateTimeFormatter.ofPattern('HH:mm').format(this.event.timestampTo!)
      : this.getRoundedTimeString(15, ZonedDateTime.now().plusHours(1));
  }

  private getRoundedTime(minutes: number, time: ZonedDateTime): ZonedDateTime {
    const currentMinutes = time.minute();
    const mod = currentMinutes % minutes;
    return time.plusMinutes(minutes-mod);
  }

  private getRoundedTimeString(minutes: number, time: ZonedDateTime): string {
    const roundedTime = this.getRoundedTime(minutes, time);
    return DateTimeFormatter.ofPattern('HH:mm').format(roundedTime);
  }

  private onAddBox() {
    //Backend logic to allocate eventbox
  }
  private removeBox(id: string) {
    if (this.eventBoxes) {
      this.eventBoxes = this.eventBoxes.filter(eb => eb.eventBoxId !== id);
    }
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 22px;
}
.option-buttons {
  margin-left: auto;
}

.button {
  height: 35px;
  border-radius: 2px;
  text-align: center;
  font-size: 12px/16px;
  letter-spacing: 0;
  width: 7rem;
  margin-left: 0.7rem;
}
.add-box {
  height: 20px;
  width: 7rem;
  border-radius: 2px;
  font-size: 12px;
  display: flex;
}
.blue {
  background: #4573e3 0% 0% no-repeat padding-box;
  color: #ffffff;
  border: none;
}
.cancel {
  border: 1px solid #949494;
  background: #f1f0ed;
  color: #949494;
}
.input-name {
  border: none;
  color: #212121;
  font: 20px/26px Roboto;
  border-bottom: 1.2px solid rgba(148, 148, 148, 0.2);
  width: 100%;
  text-align: left;
  padding-left: 6px;
  margin-bottom: 25px;
  background-color: #f1f0ed;
  outline: none;
}
.baseline {
  align-items: baseline;
}
.clock {
  position: absolute;
  margin-top: 4px;
  padding-left: 1px;
}
.row {
  display: flex;
  margin-bottom: 25px;
}
.column {
  display: flex;
  flex-direction: column;
}
.date-time {
  color: #212121;
  margin: 0px 15px 0px 34px;
  font-size: 15px;
}
.svg {
  filter: invert(52%) sepia(0%) saturate(980%) hue-rotate(315deg)
    brightness(81%) contrast(105%);
  height: 20px;
}
.plus {
  filter: invert(96%) sepia(48%) saturate(429%) hue-rotate(45deg)
    brightness(124%) contrast(89%);
  height: 20px;
  margin-left: -5px;
  margin-top: -1px;
}
.time {
  margin: 0px 5px 0px 5px;
}
.half {
  width: 50%;
}
.input-location {
  color: #212121;
  border: none;
  margin-left: 15px;
  border-bottom: 1.2px solid rgba(148, 148, 148, 0.2);
  text-align: left;
  width: 100%;
  background-color: #f1f0ed;
  font-size: 15px;
  outline: none;
}
.user {
  color: #212121;
  margin-left: 15px;
  border-bottom: 1.2px solid rgba(148, 148, 148, 0.2);
  width: 100%;
  text-align: left;
}
.button-text {
  margin-top: 1px;
  margin-left: 5px;
}

.wrapper {
  display: flex;
  width: 100%;
}

.right {
  justify-content: flex-end;
}
.location-row {
  height: 20px;
}
.eventbox {
  display: flex;
  width: 7rem;
  text-align: left;
  margin-bottom: 5px;
  justify-content: space-between;
}

.cross {
  transform: rotate(45deg);
  height: 20px;
  filter: invert(7%) sepia(0%) saturate(2275%) hue-rotate(65deg)
    brightness(106%) contrast(87%);
}
.end-time {
  margin-right: 3.2rem;
}
.dash {
  margin-left: 1.8rem;
}
</style>
