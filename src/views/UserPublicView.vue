<template>
  <main class="relative min-h-screen">
    <!-- Blue BG -->
    <div
      class="absolute top-0 left-0 w-full rounded-br-3xl rounded-bl-3xl bg-primary-blue -z-1 hidden md:block md:h-[400px]"
    ></div>
    <!-- Preview Navigation -->
    <section class="relative flex flex-col p-4 md:px-6 md:py-8 w-full">
      <!-- Profile -->
      <ProfileCard :user="user" />
    </section>
  </main>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import ProfileCard from '@/components/ProfileCard.vue';

export default {
  name: 'PreviewView',
  data() {
    return {
      user: {}
    };
  },
  methods: {
    ...mapActions(useUserStore, ['getUserByUsername'])
  },
  async created() {
    const user = await this.getUserByUsername(this.$route.params.id);

    if (!user) {
      this.$router.push({ name: 'home' });
      return;
    }

    this.user = user;
  },
  components: {
    ProfileCard
  }
};
</script>
