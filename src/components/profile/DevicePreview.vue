<template>
  <!--Device Preview START -->
  <div
    class="hidden rounded-lg bg-white lg:flex items-center justify-center h-screen p-16 xl:w-[500px] 2xl:w-[590px] sticky top-2"
  >
    <div class="relative h-[500px] overflow-hidden">
      <div class="absolute bg-white left-4 right-4 top-8 bottom-7 rounded-xl"></div>
      <div class="absolute left-0 top-4 bottom-7 w-full py-8 px-7 overflow-hidden">
        <!-- Profile Image -->
        <div
          class="rounded-full h-[75px] w-[75px] mx-auto overflow-hidden border-2 border-primary-blue mb-4"
        >
          <img
            v-if="currentUser.imageUrl"
            :src="currentUser.imageUrl"
            alt="sample"
            class="object-center"
          />
          <img else src="/assets/headshot.png" alt="sample" class="object-center" />
        </div>

        <!-- Profile Name and Email -->
        <div class="text-center mb-9">
          <h1 class="font-bold mb-0 w-full bg-white">
            {{ profileDetails.firstName }} {{ profileDetails.lastName }}
          </h1>
          <p class="text-gray-600 text-sm w-full bg-white">{{ profileDetails.workEmail }}</p>
        </div>

        <!-- Profile Links -->
        <ul class="flex flex-col gap-3">
          <li v-for="link in links" :key="link.id">
            <div
              class="px-2 py-2 border-2 w-full text-sm text-white rounded-lg flex justify-between items-center"
              :class="buttonVariants[link.code]"
            >
              <div class="flex items-center gap-2">
                <span>
                  <!-- Social Icon -->
                  <img :src="`/assets/device-icons/icon-${link.code}.svg`" alt="" />
                </span>
                {{ link.platform }}
              </div>
              <span>
                <!-- Arrow Right -->
                <IconArrowRight />
              </span>
            </div>
          </li>
        </ul>
      </div>
      <img src="/assets/illustration-phone-mockup.svg" alt="" class="h-full w-full" />
    </div>
  </div>
  <!--Device Preview END -->
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import { buttonVariants } from '@/data/buttonVariants';

export default {
  name: 'DevicePreview',
  data() {
    return {
      buttonVariants
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['currentUser', 'links', 'profileDetails'])
  },

  components: {
    IconArrowRight
  }
};
</script>
