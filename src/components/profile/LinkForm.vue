<template>
  <form>
    <div class="flex flex-col gap-2 mt-4">
      <p class="text-sm font-bold text-gray-400">Platform</p>
      <div
        type="text"
        class="flex items-center justify-between rounded-lg bg-white py-3 px-4 border border-gray-200 relative"
        @click="showLinks = !showLinks"
        @mouseleave="showLinks = false"
      >
        <span>{{ link.platform }}</span>
        <span> <IconChevronDown /> </span>

        <div v-show="showLinks" class="bg-white rounded-lg absolute w-full top-full left-0 z-50">
          <div
            v-for="link in availableLinks"
            :key="link.code"
            class="px-4 py-3 border-b"
            @click="selectLink(link)"
          >
            {{ link.platform }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <label class="text-sm font-bold text-gray-400">Link</label>
      <input
        :name="platform"
        type="text"
        class="rounded-lg py-3 px-4 border border-gray-200"
        :placeholder="placeholder"
        :value="link.url"
        @input="formData.links[index].url = $event.target.value"
      />
    </div>
  </form>
</template>

<script>
import { mapWritableState } from 'pinia';
import { availableLinks } from '@/data/links';
import IconChevronDown from '../icons/IconChevronDown.vue';
import { useUserStore } from '../../stores/user';

export default {
  name: 'LinkForm',
  data() {
    return {
      availableLinks,
      showLinks: false,
      placeholder: '',
      code: ''
    };
  },
  props: { index: Number, link: Object },
  components: {
    IconChevronDown
  },
  computed: {
    ...mapWritableState(useUserStore, ['formData']),
    activePlatform() {
      return this.formData.links[this.index].platform;
    }
  },
  methods: {
    selectLink(link) {
      this.formData.links[this.index].platform = link.platform;
      this.formData.links[this.index].code = link.code;
      this.placeholder = link.placeholder;
    }
  }
};
</script>
