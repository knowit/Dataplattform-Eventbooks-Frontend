<template>
  <div class="container">
    <label for="feedback">Hva likte du? Hva kunne vært bedre? (Valgfritt)</label>
    <br />
    <textarea v-model="comment" id="comment"></textarea>
    <div class="nav-btn-container">
      <button class="nav-btn back-btn" @click="emitBack">Tilbake</button>
      <button class="nav-btn next-btn" @click="emitFinished">Ferdig</button>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({})
export default class EventComment extends Vue {

  @Prop()
  private value!: string;

  private comment = this.value

  @Watch('comment')
  @Emit('input')
  private emitInput() {
    return this.comment;
  }

  @Emit('back')
  private emitBack() {
    return;
  }

  @Emit('finished')
  private emitFinished() {
    return;
  }

}

</script>

<style scoped>

.nav-btn {
  font-size: 14px;
  padding: 1em 3em;
  font: 400 12px "Roboto", sans-serif;
  margin-left: 2em;
  margin-top: 1em;
  border-radius: 2px;
}

.next-btn {
  background-color: var(--btn-blue);
  border: none;
  color: #fff;
}

.back-btn {
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #949494;
  color: #696969;
}

.container {
  display: block;
  text-align: start;
  width: 90vw;
  max-width: 48em;
}

#comment {
  color: #707070;
  border-radius: 2px;
  border-style: none;
  resize: none;
  height: 15em;
  width: 100%;
  padding: 2em;
  font: 400 14px "Roboto", sans-serif;
  box-sizing: border-box;
}

.nav-btn-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
  
</style>