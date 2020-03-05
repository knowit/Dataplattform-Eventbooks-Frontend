<template>
  <div class="container" @mouseover="show = true" @mouseleave="show = false">
    <input type="text" class="input clickable" v-bind:class="{ green: show}" v-model="input"/>
    <div class="autocomplete-items" v-if="show">
      <div class="autocomplete-item clickable" v-for="item in timestamps" :key="item" @click="onSelect(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class TimePicker extends Vue {
  @Prop()
  private currentTimestamp?: string;

  private timestamps: string[] = [
    '00:00',
    '00:15',
    '00:30',
    '00:45',
    '01:00',
    '01:15',
    '01:30',
    '01:45',
    '02:00',
    '02:15',
    '02:30',
    '02:45',
    '03:00',
    '03:15',
    '03:30',
    '03:45',
    '04:00',
    '04:15',
    '04:30',
    '04:45',
    '05:00',
    '05:15',
    '05:30',
    '05:45',
    '06:00',
    '06:15',
    '06:30',
    '06:45',
    '07:00',
    '07:15',
    '07:30',
    '07:45',
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12.45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
    '21:30',
    '21:45',
    '22:00',
    '22:15',
    '22:30',
    '22:45',
    '23:00',
    '23:15',
    '23:30',
    '23:45'
  ];

  private input: string = this.currentTimestamp ? this.currentTimestamp : '';
  private show: Boolean = false;

  private onSelect(item: string) {
    this.input = item;
    this.show = false;
    this.$emit('input', this.input);
  }
}
</script>

<style scoped>
.input {
  color: #212121;
  width: 42px;
  font-size: 15px;
  background-color: #f1f0ed;
  outline: none;
  border: none;
  padding: 5px 8px 5px 10px;
}
.green {
  background-color: #b7debd;
}

.container {
  position: relative;
  margin-bottom: 0px !important;
}

.autocomplete-items {
  position: absolute;
  width: 100%;
  height: 127px;
  overflow: scroll;
  transition-delay: 1s;
}

.autocomplete-item {
  background: white;
  text-align: left;
  padding: 3px 0px 3px 5px;
}
.autocomplete-item:hover {
  background: #f7f7f7 0% 0% no-repeat padding-box;
}
</style>
