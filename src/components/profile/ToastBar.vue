<template>
  <div
    v-show="toast.show"
    class="flex gap-4 items-center justify-center fixed bg-[rgba(0,0,0,0.7)] py-4 px-6 rounded-lg bottom-8 left-1/2 -translate-x-1/2 text-center text-white text-sm min-w-[300px] font-bold lg:text-base"
  >
    <span class="w-3 h-3 rounded-full" :class="toast.variant"></span>
    {{ toast.message }}
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
  name: 'ToastBar',
  computed: {
    ...mapWritableState(useUserStore, ['toast'])
  },
  watch: {
    toast() {
      if (this.toast.show) {
        setTimeout(() => {
          this.toast = {
            show: false,
            message: '',
            variant: ''
          };
        }, 5000);
      }
    }
  }
};
</script>
