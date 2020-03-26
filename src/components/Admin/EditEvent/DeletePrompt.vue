<template>
  <div class="container">
    <div class="text">Er du sikker på at du vil slette arrangementet?</div>
    <div class="option-buttons">
      <button class="cancel button clickable" @click="onCancel">Avbryt</button>
      <button class="delete button clickable" @click="onDelete">Slett</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class DeletePrompt extends Vue {
  private onCancel() {
    this.$emit('cancel');
  }

  private onDelete() {
    this.$emit('delete');
  }

}
</script>

<style scoped>
.container {
  margin-bottom: 22px;
  width: 100%;
}
.text {
  width: 100%;
  text-align: center;
  color: #212121;
  margin-bottom: 22px;
}
.option-buttons {
  margin: auto;
}
.delete {
  margin-left: 3rem;
}

</style>
