<template>
  <div class="flex-1 flex justify-center pt-10 pb-20 md:py-28">
    <!-- Profile Card -->
    <div class="py-12 px-14 md:rounded-3xl min-w-[365px] max-w-[400px] md:bg-white md:shadow-xl">
      <!-- Profile Image -->
      <div
        class="rounded-full h-[120px] w-[120px] mx-auto overflow-hidden border-4 border-primary-blue mb-6"
      >
        <img v-if="user.imageUrl" :src="user.imageUrl" :alt="user.username" class="object-center" />
        <img else src="/assets/headshot.png" alt="sample" class="object-center" />
      </div>

      <!-- Profile Name and Email -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold mb-4">{{ user.firstName }} {{ user.lastName }}</h1>
        <p class="text-gray-600">{{ user.workEmail }}</p>
      </div>

      <!-- Profile Links -->
      <ul class="flex flex-col gap-5">
        <li v-for="link in user.links" :key="link.id">
          <a
            :href="link.url"
            target="_blank"
            class="px-4 py-3 border-2 text-white rounded-lg flex justify-between items-center"
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
import { buttonVariants } from '@/data/buttonVariants';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

export default {
  name: 'ProfileCard',
  data() {
    return {
      buttonVariants
    };
  },
  props: {
    user: Object
  },

  components: {
    IconArrowRight
  }
};
</script>
