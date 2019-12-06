<template>
  <div class="container">
    <event-code-input v-model="code" />
    <button class="ok-button" :disabled="!isActive" @click="goToEvent">Neste</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import EventCodeInput from './EventCodeInput.vue';

@Component({
    components: {
        EventCodeInput
    }
})
export default class EventSelector extends Vue {
  private code: string = '';

  private get isActive() {
    return this.code.length === 5;
  }

  private goToEvent() {
    this.$router.push({ name: 'eventRating', params: { eventId: this.code } });
  }

}
</script>

<style scoped>
.container {
  margin-top: 22px;
}

.ok-button:focus {
  outline: 0;
}

.ok-button {
  width: 91%;
  padding: 11px 13px;
  background: #949494 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 2px;
  opacity: 1;
  text-align: center;
  font: Regular 12px/14px Roboto;
  letter-spacing: 0;
  color: #ffffff;
  margin-top: 10px;
  cursor: pointer; 
}

.ok-button:enabled {
  background-color: #4573e3 !important;
}
</style>
