<template>
  <div>
    <user />
    <button @click="signOut">Sign Out</button>

    <!-- All subroutes within this component will only be shown if the user is authenticated -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { signOut, isAuthenticated } from '@/services/authentication.service';
import User from '@/components/Admin/User.vue';

@Component({
  components: {
    User
  }
})
export default class AdminView extends Vue {
  private signOut = signOut;

  private async created() {
    this.checkAuthenticated();
  }

  private async beforeUpdate() {
    this.checkAuthenticated();
  }

  private async checkAuthenticated() {
    if (!await isAuthenticated()) {
      this.$router.push({ name: 'signin' });
    }
  }
}
</script>

<style scoped>
</style>
