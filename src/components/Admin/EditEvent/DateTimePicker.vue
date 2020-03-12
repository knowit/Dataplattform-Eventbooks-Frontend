<template>
  <div class="container1">
    <img class="svg clock" src="@/assets/clock.svg" />
    <date-picker class="clickable date-picker" color="green" :min-date="new Date()" v-model="date">
      <div class="date-time">{{ this.date.toLocaleDateString() }}</div>
    </date-picker>
    <time-picker :current-timestamp="this.startTime" @input="updateStartTime"/>
    &ndash;
    <time-picker :current-timestamp="this.endTime" @input="updateEndTime"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ZonedDateTime, DateTimeFormatter, convert, LocalDate, ZoneId } from '@js-joda/core';
import { DatePicker } from 'v-calendar';
import TimePicker from './TimePicker.vue';
import '@js-joda/timezone';

@Component({
  components: { DatePicker, TimePicker}
})
export default class DateTimePicker extends Vue {
  @Prop()
  private timestamps?: {timestampFrom: ZonedDateTime, timestampTo: ZonedDateTime}

  private date: Date = this.timestamps
    ? convert(this.timestamps.timestampFrom!).toDate()
    : convert(ZonedDateTime.now()).toDate();

  private startTime: string = this.timestamps ?
    DateTimeFormatter.ofPattern('HH:mm').format(this.timestamps.timestampFrom!)
    : this.getRoundedTimeString(15, ZonedDateTime.now());

  private endTime: string = this.timestamps ?
    DateTimeFormatter.ofPattern('HH:mm').format(this.timestamps.timestampTo!)
    : this.getRoundedTimeString(15, ZonedDateTime.now().plusHours(1));

  mounted() {
    this.update();
  }

  private update() {
    this.$emit('input', {
      timestampFrom: this.getTimeStamp(this.startTime),
      timestampTo: this.getTimeStamp(this.endTime)
    });
  }
  @Watch('date')
  private updateDate() {
    this.update();
  }

  private updateStartTime(newTime: string) {
    this.startTime = newTime;
    this.update();
  }

  private updateEndTime(newTime: string) {
    this.endTime = newTime;
    this.update();
  }

  private getTimeStamp(time: string): ZonedDateTime {
    const dateString = this.date.getFullYear() + '-' + ('0'+(this.date.getMonth()+1)).slice(-2) + '-' + ('0'+this.date.getDate()).slice(-2);
    const d = LocalDate.parse(dateString)
      .atStartOfDay()
      .atZone(ZoneId.of('Europe/Berlin'));
    const timeList = time.split(':');
    return d.withHour(parseInt(timeList[0])).withMinute(parseInt(timeList[1])).withSecond(0).withNano(0);
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

}
</script>

<style scoped>
.container1 {
  display: flex;
  margin-bottom: 25px;
  align-items: baseline;
}

.clock {
  position: absolute;
  margin-top: 4px;
  padding-left: 1px;
}

.date-picker {
  width: 5.3rem;
  margin-left: 28px;
  padding: 6px 5px 4px 5px;
}
.date-picker:hover {
  background-color: #b7debd;
}
.date-time {
  color: #212121;
  margin: 0px 15px 0px 2px;
  font-size: 15px;
}

</style>
