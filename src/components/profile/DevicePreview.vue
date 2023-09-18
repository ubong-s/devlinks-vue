<template>
  <!--Device Preview START -->
  <div
    class="hidden rounded-lg bg-white lg:flex items-center justify-center h-screen p-16 xl:w-[500px] 2xl:w-[590px] sticky top-2"
  >
    <div class="relative h-[500px] overflow-hidden">
      <div class="absolute left-0 top-4 bottom-8 w-full py-8 px-7 overflow-hidden">
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
          <img else src="/assets/sample.png" alt="sample" class="object-center" />
        </div>

        <!-- Profile Name and Email -->
        <div class="text-center mb-9">
          <h1 class="font-bold mb-0 w-full bg-white">
            {{ currentUser.firstName }} {{ currentUser.lastName }}
          </h1>
          <p class="text-gray-600 text-sm w-full bg-white">{{ currentUser.workEmail }}</p>
        </div>

        <!-- Profile Links -->
        <ul class="flex flex-col gap-3">
          <li v-for="link in currentUser.links" :key="link.id">
            <div
              class="bg-black px-2 py-[7px] border-2 w-full border-black text-sm text-white rounded-lg flex justify-between items-center"
            >
              <a class="flex items-center gap-2">
                <span>
                  <!-- Social Icon -->
                  <img :src="`/assets/icon-${link.code}.svg`" alt="" />
                </span>
                {{ link.platform }}
              </a>
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
import IconArrowRight from '../icons/IconArrowRight.vue';
import { useUserStore } from '../../stores/user';

export default {
  name: 'DevicePreview',
  computed: {
    ...mapWritableState(useUserStore, ['currentUser'])
  },

  components: {
    IconArrowRight
  }
};
</script>
