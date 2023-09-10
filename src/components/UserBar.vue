<template>
  <div class="bg-white p-4 flex gap-4 items-center justify-end">
    <p>
      {{ currentUser.email }}
    </p>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';

export default {
  name: 'UserBar',
  props: {
    currentUser: {
      type: Object
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
    logout() {
      this.signOut();
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
