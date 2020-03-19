<template>
  <div class="container">
    <div v-if="errorExist()" class="error-message">{{error.errorMessage}}</div>
    <input class="input-name" v-bind:class="{ error: error.nameError }" placeholder="Hva skal eventet hete?" v-model="eventName" />
    <div class="wrapper">
      <div class="left-half">
        <date-time-picker v-bind:class="{ error: error.datetimeError }" :timestamps="this.getTimestamps()" @input="updateTimestamps"/>
        <div class="row location-row" v-bind:class="{ error: error.locationError }">
          <img class="svg" src="@/assets/position.svg" />
          <input class="input-location" placeholder="Hvor er eventet?" v-model="eventLocation" />
        </div>
        <div class="row">
          <img class="svg" src="@/assets/person.svg" />
          <div class="user">{{creator}}</div>
        </div>
      </div>
      <div class="row right-half">
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
      <button class="delete button clickable" @click="onDelete">Slett</button>
      <button class="blue button clickable" @click="onCreate">{{createButtonString}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Event from '@/models/event.model';
import EventBox from '@/models/eventBox.model';
import TimePicker from './TimePicker.vue';
import DateTimePicker from './DateTimePicker.vue';
import { ZonedDateTime, DateTimeFormatter, convert } from '@js-joda/core';
import { DatePicker } from 'v-calendar';

@Component({
  components: { DatePicker, TimePicker, DateTimePicker }
})
export default class AdminEditEvent extends Vue {
  @Prop()
  private event?: Event;

  private createButtonString: string = this.event? 'Oppdater' : 'Opprett';

  private eventName: string | undefined = this.event
    ? this.event.eventName
    : '';

  private timestamps: {timestampFrom: ZonedDateTime, timestampTo: ZonedDateTime} | undefined = this.getTimestamps();

  private eventBoxes: EventBox[] | undefined = this.event ?
    this.event.eventBoxes
    : [];

  private eventLocation: string | undefined = this.event ?
    this.event.eventLocation
    : '';

  private creator: string = this.event ? this.event.creator ? this.event.creator : '' : 'Logged in user'; // No way to update atm, the logged in user will be the creator

  private error: {nameError: boolean, datetimeError: boolean, locationError: boolean, errorMessage: string} = {
    nameError: false,
    datetimeError: false,
    locationError: false,
    errorMessage: 'Feilmelding'
  }

  private errorExist(): boolean {
    return this.error.nameError || this.error.datetimeError || this.error.locationError;
  }

  private onCancel() {
    this.$emit('cancel');
  }

  private onCreate() {
    // Feilsjekking
    if (!this.validateEvent()) {
      console.log('Invalid event');
      return;
    }
    // Opprett eller oppdater event
    const newEvent = this.createEvent();
    console.log(newEvent);
    // Oppdater database
  }
  private onDelete() {
    // Popup varsel før det tar effekt?
    // Nytt event med deleted felt
    // Oppdater database

    console.log('Slett - Not implemented');
  }

  private onAddBox() {
    //Backend logic to allocate eventbox
    console.log('Add box - Not implemented');
  }
  private removeBox(id: string) {
    if (this.eventBoxes) {
      this.eventBoxes = this.eventBoxes.filter(eb => eb.eventBoxId !== id);
    }
  }

  private updateTimestamps(newTimestamps: {timestampFrom: ZonedDateTime, timestampTo: ZonedDateTime}) {
    this.timestamps = newTimestamps;
  }

  private createEvent(): Event {
    const e = new Event();
    e.id = this.event ? this.event.id : this.createNewID();
    e.eventName = this.eventName;
    e.timestampFrom = this.timestamps ? this.timestamps.timestampFrom : undefined;
    e.timestampTo = this.timestamps ? this.timestamps.timestampTo : undefined;
    e.eventLocation = this.eventLocation;
    e.eventBoxes = this.eventBoxes;
    e.active = true;
    return e;
  }

  private createNewID(): string {
    // TODO: proper ID
    return 'id' + Math.floor(Math.random() * 1000);
  }

  private getTimestamps(): {timestampFrom: ZonedDateTime, timestampTo: ZonedDateTime} | undefined {
    if (this.event && this.event.timestampFrom && this.event.timestampTo) {
      return {
        timestampFrom: this.event.timestampFrom,
        timestampTo: this.event.timestampTo
      };
    }
  }

  private validateEvent(): boolean {
    return this.validateName() && this.validateDateTime() && this.validateLocation();
  }

  private validateName(): boolean {
    if (this.eventName && this.eventName.length > 0) {
      if (this.eventName.length > 255) {
        this.error.nameError = true;
        this.error.errorMessage = 'Navnet på arrangementet er for langt';
        return false;
      }
      this.error.nameError = false;
      this.error.errorMessage = '';
      return true;
    }
    this.error.nameError = true;
    this.error.errorMessage = 'Navnet på arrangementet mangler';
    return false;
  }

  private validateDateTime(): boolean {
    const now = ZonedDateTime.now();
    if (!this.timestamps) {
      this.error.datetimeError = true;
      this.error.errorMessage = 'Mangler tidspunkt for arrangementet';
      return false;
    }
    else if (!this.timestamps.timestampTo.isAfter(this.timestamps.timestampFrom)) {
      this.error.datetimeError = true;
      this.error.errorMessage = 'Arrangementet kan ikke ha sluttidspunkt før starttidspunkt';
      return false;
    }
    else if (!this.timestamps.timestampTo.isAfter(now)) {
      this.error.datetimeError = true;
      this.error.errorMessage = 'Arrangementet kan ikke være før nåværende tidspunkt';
      return false;
    }
    this.error.datetimeError = false;
    this.error.errorMessage = '';
    return true;
  }

  private validateLocation(): boolean {
    if (this.eventLocation && this.eventLocation.length > 0) {
      if (this.eventLocation.length > 255) {
        this.error.locationError = true;
        this.error.errorMessage = 'Stedsnavnet for arrangementet er for langt';
        return false;
      }
      this.error.locationError = false;
      this.error.errorMessage = '';
      return true;

    }
    this.error.locationError = true;
    this.error.errorMessage = 'Stedsnavnet for arrangementet mangler';
    return false;
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
  width: 6rem;
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
.delete {
  background: #D51919 0% 0% no-repeat padding-box;
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
  width: 29.35rem;
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
  margin: 0px 15px 0px 2px;
  font-size: 15px;
}
.date-picker {
  width: 5.3rem;
  margin-left: 28px;
  padding: 6px 5px 4px 5px;
}
.date-picker:hover {
  background-color: #b7debd;
}
::v-deep .svg {
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
.left-half {
  width: 54%;
}
.right-half{
  width: 46%;
  justify-content: flex-end;
  margin-top: 3px;
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
.error {
  border: 2px solid #D51919;
}
.error-message {
  width: 29.35rem;
  color: #D51919;
  margin-bottom: 15px;
  padding: 0px 8px 0px 8px;
  text-align: left;
}
</style>
