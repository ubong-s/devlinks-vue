<template>
  <RouterView />
  <ToastBar />
</template>

<script>
import { mapWritableState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { auth } from '@/includes/firebase';
import ToastBar from '@/components/profile/ToastBar.vue';

export default {
  name: 'App',
  components: { ToastBar },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'currentUser', 'links', 'profileDetails'])
  },
  methods: {
    ...mapActions(useUserStore, ['getUser'])
  },
  async created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;

      const userData = await this.getUser(auth.currentUser.uid);

      this.currentUser = { ...userData };
      this.links = [...userData.links];
      this.profileDetails = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        workEmail: userData.workEmail
      };
    }
  }
};
</script>
