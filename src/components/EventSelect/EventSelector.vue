<template>
  <div class="container">
    <event-code-input v-model="code" />
    <button class="ok-button btn" :disabled="!isActive" @click="goToEvent">Neste</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { verifyEventCode } from '@/services/event.service';

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
    verifyEventCode(this.code).then(() => {
      this.$router.push({ name: 'eventRating', params: { eventCode: this.code } });
    }).catch((err) => {
      alert(`Fant ikke event med kode ${this.code}`);
      console.log(err);
    });
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
  background: #949494 0% 0% no-repeat padding-box;
  color: #ffffff;
  margin-top: 10px;
}

.ok-button:enabled {
  background-color: #4573e3 !important;
}
</style>
