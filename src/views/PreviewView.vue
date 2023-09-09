<template>
  <main class="relative min-h-screen">
    <!-- Blue BG -->
    <div
      class="absolute top-0 left-0 w-full rounded-br-3xl rounded-bl-3xl bg-primary-blue -z-1 hidden md:block md:h-[400px]"
    ></div>
    <!-- Preview Navigation -->
    <section class="relative flex flex-col p-4 md:px-6 md:py-8 w-full">
      <!-- Profile Navigation -->
      <PreviewNav />

      <!-- Profile -->
      <ProfileCard />
    </section>
  </main>
</template>

<script>
import PreviewNav from '@/components/PreviewNav.vue';
import ProfileCard from '@/components/ProfileCard.vue';

export default {
  name: 'PreviewView',
  components: {
    PreviewNav,
    ProfileCard
  }
};
</script>
