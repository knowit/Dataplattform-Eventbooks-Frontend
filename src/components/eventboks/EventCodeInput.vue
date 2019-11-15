<template>
  <div id="container">
    <template v-for="n in 5" >
      <input 
        :key="n"
        class="input-field"
        :maxlength="1"
        @keyup="back($event, n)"
        @keypress="next($event, n)"
        v-model="input[n-1]"
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
  private input: string[] = [];

  @Ref('inputs')
  private inputs!: HTMLInputElement[];

  @Watch('input')
  @Emit('input')
  private emitCode() {
    return this.input.join('').toUpperCase();
  }

  private next(event: KeyboardEvent, n: number) {
    const key = String.fromCharCode(event.charCode || event.which);
    if (!/[a-zA-Z0-9]/.test(key)) {
      event.preventDefault();
    } else {
      this.input[n-1] = key;
      if (n < 5) {
        this.inputs[n].focus();
      }
    }
  }

  private back(event: KeyboardEvent, n: number) {
    if (event.key === 'Backspace') {
      this.input[n-1] = '';
      if (n > 1) {
        this.inputs[n - 2].focus();
      }
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