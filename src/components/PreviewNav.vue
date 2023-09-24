<template>
  <nav
    class="grid grid-cols-2 items-center bg-white rounded-lg gap-4 md:flex md:justify-between p-4 md:px-6"
  >
    <RouterLink
      :to="{ name: 'profile' }"
      class="border-2 rounded-lg border-primary-blue text-center text-primary-blue font-medium py-3 px-8 hover:bg-primary-blue hover:text-white transition-colors"
      >Back to Editor</RouterLink
    >
    <button
      @click="shareLink"
      class="border-2 rounded-lg border-primary-blue text-center bg-primary-blue text-white font-medium py-3 px-8 hover:bg-transparent hover:text-primary-blue transition-colors"
    >
      Share Link
    </button>
  </nav>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';

export default {
  name: 'PreviewNav',

  methods: {
    ...mapActions(useUserStore, ['shareLink'])
  }
};
</script>
