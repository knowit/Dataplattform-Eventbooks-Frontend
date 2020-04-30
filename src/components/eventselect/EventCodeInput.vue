<template>
  <div id="container">
    <template v-for="n in 5">
      <input
        :key="n"
        class="input-field"
        :maxlength="10"
        @input="onInput($event.target.value, n)"
        @keyup="back($event, n)"
        :value="inputData[n-1]"
        ref="inputs"
        v-on:focus="$event.target.select()"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EventCodeInput extends Vue {
  private inputData: string[] = [];

  @Ref('inputs')
  private inputs!: HTMLInputElement[];

  private onInput(value: string, n: number) {
    // Use last value because maxValue is only checked
    // on chrome-android after focus lost
    const last = value ? value[value.length - 1] : '';
    this.inputs[n - 1].value = last;
    this.inputData[n - 1] = last;

    if (n < 5 && last) {
      this.inputs[n].focus();
    }

    this.$emit('input', this.inputData.join('').toUpperCase());
  }

  private back(event: KeyboardEvent, n: number) {
    if (event.key === 'Backspace' && n > 1) {
      this.inputs[n - 2].focus();
    }
  }

}
</script>

<style scoped>
.input-field {
  width: 1.3em;
  height: 1.3em;
  font: Regular 20px/24px Roboto;
  font-size: 25px;
  margin-right: 5px;
  margin-left: 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 2px;
  opacity: 1;
  text-align: center;
  letter-spacing: 0;
  color: #707070;
  text-transform: uppercase;
}
</style>