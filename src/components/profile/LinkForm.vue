<template>
  <form @submit.prevent="">
    <div class="flex flex-col gap-2 mt-4">
      <p class="text-sm font-bold text-gray-400">Platform</p>
      <div
        type="text"
        class="flex items-center justify-between rounded-lg bg-white py-3 px-4 border border-gray-200 relative"
        @click="showLinks = !showLinks"
        @mouseleave="showLinks = false"
      >
        <span class="flex items-center gap-4">
          <img :src="`/assets/form-icons/icon-${link.code}.svg`" alt="" />
          {{ link.platform }}
        </span>
        <span> <IconChevronDown /> </span>

        <div
          v-show="showLinks"
          class="dropdown-container bg-white rounded-lg absolute w-full top-[105%] left-0 z-50 h-[250px] overflow-hidden overflow-y-auto shadow-md"
        >
          <div
            v-for="item in availableLinks"
            :key="item.code"
            class="px-4 py-3 border-b flex items-center gap-4 cursor-pointer hover:text-primary-blue"
            :class="{ 'text-primary-blue': link.platform === item.platform }"
            @click="
              editLink(index, {
                ...link,
                code: item.code,
                platform: item.platform
              })
            "
          >
            <img :src="`/assets/form-icons/icon-${item.code}.svg`" alt="" />
            {{ item.platform }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <label class="text-sm font-bold text-gray-400">Link</label>
      <div class="relative">
        <img class="absolute left-4 top-1/2 -translate-y-1/2" src="/assets/icon-link.svg" alt="" />
        <input
          name="url"
          type="text"
          class="rounded-lg py-3 pl-12 pr-4 border border-gray-200 w-full focus:outline-none focus:border-primary-blue"
          :value="link.url"
          :class="{ 'border-red-400': link.error }"
          @input="
            editLink(index, {
              ...link,
              url: $event.target.value
            })
          "
        />
      </div>
      <div class="text-sm mt-0.5 italic text-red-400">
        {{ link.error }}
      </div>
    </div>
  </form>
</template>

<script>
import { availableLinks } from '@/data/links';
import IconChevronDown from '../icons/IconChevronDown.vue';

export default {
  name: 'LinkForm',
  data() {
    return {
      availableLinks,
      showLinks: false
    };
  },
  props: {
    index: Number,
    link: {
      id: String,
      order: Number,
      platform: String,
      url: String,
      code: String
    },
    editLink: Function,
    error: String
  },
  components: {
    IconChevronDown
  },

  methods: {}
};
</script>

<style scoped>
.dropdown-container::-webkit-scrollbar {
  height: 0.5rem;
  width: 0.5em;
}

.dropdown-container::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
  /* outline: 1px solid slategrey; */
}
</style>
