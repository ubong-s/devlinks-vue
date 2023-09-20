<template>
  <div class="flex-1 flex justify-center pt-10 pb-20 md:py-28">
    <!-- Profile Card -->
    <div class="py-12 px-14 md:rounded-3xl w-[365px] md:bg-white md:shadow-xl">
      <!-- Profile Image -->
      <div
        class="rounded-full h-[120px] w-[120px] mx-auto overflow-hidden border-4 border-primary-blue mb-6"
      >
        <img
          v-if="currentUser.imageUrl"
          :src="currentUser.imageUrl"
          alt="sample"
          class="object-center"
        />
        <img else src="/assets/sample.png" alt="sample" class="object-center" />
      </div>

      <!-- Profile Name and Email -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold mb-4">
          {{ currentUser.firstName }} {{ currentUser.lastName }}
        </h1>
        <p class="text-gray-600">{{ currentUser.workEmail }}</p>
      </div>

      <!-- Profile Links -->
      <ul class="flex flex-col gap-5">
        <li v-for="link in currentUser.links" :key="link.id">
          <a
            :href="link.url"
            target="_blank"
            class="p-4 border-2 text-white rounded-lg flex justify-between items-center"
            :class="buttonVariants[link.code]"
          >
            <span class="flex items-center gap-2">
              <span>
                <!-- Social Icon -->
                <img :src="`/assets/device-icons/icon-${link.code}.svg`" alt="" />
              </span>
              {{ link.platform }}
            </span>
            <span>
              <!-- Arrow Right -->
              <IconArrowRight />
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { buttonVariants } from '@/data/buttonVariants';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

export default {
  name: 'ProfileCard',
  data() {
    return {
      buttonVariants
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['currentUser'])
  },
  components: {
    IconArrowRight
  }
};
</script>
