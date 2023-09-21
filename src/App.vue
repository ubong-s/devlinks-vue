<template>
  <RouterView />
</template>

<script>
import { mapWritableState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { auth } from '@/includes/firebase';

export default {
  name: 'App',

  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'currentUser'])
  },
  methods: {
    ...mapActions(useUserStore, ['getUser'])
  },
  async created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;

      const userData = await this.getUser(auth.currentUser.uid);

      this.currentUser = { ...userData };
    }
  }
};
</script>
