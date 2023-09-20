<template>
  <UserBar v-if="userLoggedIn" :currentUser="currentUser" />

  <RouterView />
</template>

<script>
import { mapWritableState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { auth } from '@/includes/firebase';
import UserBar from '@/components/UserBar.vue';

export default {
  name: 'App',
  components: { UserBar },
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
