<template>
  <div class="container">
    <input class="input-field"
      v-model="searchTerm"
      placeholder="Søk event ..."
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class AdminSearchBar extends Vue {
  private searchTerm: string = '';

  @Watch('searchTerm')
  @Emit('input')
  private emitSearchTerm(): string {
    return this.searchTerm;
  }
}
</script>

<style scoped>
.input-field {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 2px;
  border: none;
  opacity: 1;
  width: 100%;
  text-align: left;
  font: Regular 20px/24px Roboto;
  letter-spacing: 0;
  opacity: 1;
  font-size: 24px;
  padding: 9px;
  color: #696969;
}

::placeholder {
  font: Regular 15px/18px Roboto;
  color: #949494;
  font-size: 18px;
}

</style>
