<template>
  <div class="admin-container">
    <img id="logo" src="../assets/app-logo.svg" />
    <!-- Remove comment when reintroducing authentication
    <user />
    <button @click="signOut">Sign Out</button>
    -->
    <!-- All subroutes within this component will only be shown if the user is authenticated -->
    <admin-events />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { signOut, isAuthenticated } from '@/services/authentication.service';
import User from '@/components/Admin/User.vue';
import AdminEvents from '@/components/Admin/AdminEvents.vue';

@Component({
  components: {
    User,
    AdminEvents
  }
})
export default class AdminView extends Vue {
  /* Remove comment when reintroducing authentication
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
  */
}
</script>

<style scoped>
.admin-container {
  display: inline-block;
}

#logo {
  position: relative;
  bottom: 3em;
}
</style>
