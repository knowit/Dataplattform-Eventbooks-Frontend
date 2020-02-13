<template>
  <div class="container">
    <h1>{{ event.eventName }}</h1>
    <div class="option-buttons">
      <button class="cancel button clickable">Avbryt</button>
      <button class="blue button clickable">Opprett</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Event from '@/models/event.model';
//import { ZonedDateTime } from '@js-joda/core';

@Component({
  components: {

  }
})
export default class AdminEditEvent extends Vue {
  @Prop()
  private event?: Event;

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
  font: 12px/16px Roboto;
  letter-spacing: 0;
  width: 7rem;
  margin-left: 0.7rem;
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
</style>
