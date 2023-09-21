<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-full w-full rounded-lg bg-white min-h-[50vh]"
  >
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="px-4 py-12 rounded-lg bg-white md:p-10 md:pb-20">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Customize your links</h2>
      <p class="mb-10 text-gray-400 lg:text-lg">
        Add/edit/remove links below and then share all your profiles with the world
      </p>

      <!-- Add New Link Button -->
      <button
        v-show="links?.length === 0"
        @click="onAddNewLink"
        class="w-full border-2 rounded-lg border-primary-blue text-center text-primary-blue py-3 px-5 mb-4 md:px-8 hover:bg-primary-blue hover:text-white transition-colors"
      >
        + Add new link
      </button>

      <!-- Link is Empty -->

      <div
        v-if="links?.length === 0"
        class="bg-neutral-50 flex flex-col gap-8 rounded-lg items-center text-center p-4 md:p-8 lg:p-16"
      >
        <img src="/assets/illustration-empty.svg" alt="No Links Image" class="" />
        <h2 class="text-2xl font-bold md:text-3xl">Let's get you started</h2>
        <p>
          Use the "Add new link" button to get started. Once you have more than one link, you can
          reorder and edit them. We're here to help you share you profiles with everyone!
        </p>
        <button
          @click="onAddNewLink"
          class="border-2 rounded-lg border-primary-blue text-center py-3 px-5 mb-4 md:px-8 bg-primary-blue text-white hover:bg-transparent hover:text-primary-blue transition-colors"
        >
          + Add new link
        </button>
      </div>

      <!-- Links START -->
      <ul v-else>
        <li
          v-for="(link, index) in links"
          :key="index"
          class="p-6 bg-neutral-50 rounded-lg mt-4 lg:p-8 lg:mt-8"
        >
          <div class="flex items-center justify-between text-gray-400">
            <p class="flex items-center gap-2">
              <img src="/assets/icon-drag-and-drop.svg" alt="" />
              Link #{{ index + 1 }}
            </p>
            <button class="font-semibold hover:text-primary-blue" @click="onRemoveLink(link.id)">
              Remove
            </button>
          </div>
          <!-- Form Start -->
          <LinkForm :index="index" :link="link" :editLink="onEditLink" :error="errors[link.code]" />
          <!-- Form End -->
        </li>
      </ul>
      <!-- Links END -->

      <button
        v-if="links?.length > 0"
        @click="onAddNewLink"
        class="w-full border-2 rounded-lg border-primary-blue text-center text-primary-blue py-3 px-5 mb-4 md:px-8 hover:bg-primary-blue hover:text-white transition-colors mt-8"
      >
        + Add new link
      </button>
    </div>
    <div v-if="links?.length > 0">
      <hr />
      <div class="flex px-4 py-8 rounded-lg bg-white md:p-10 md:justify-end">
        <button
          class="border-2 rounded-lg border-primary-blue text-center text-white bg-primary-blue font-medium py-3 px-5 w-full md:px-8 transition-opacity cursor-pointer md:w-min"
          :disabled="inSubmission || valuesUnchanged"
          :class="{
            'opacity-50 disabled:cursor-not-allowed': inSubmission || valuesUnchanged,
            'hover:opacity-80': !valuesUnchanged
          }"
          @click.prevent.stop="saveLinks"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { availableLinks } from '@/data/links';
import LinkForm from '@/components/profile/LinkForm.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const linkValidator = {
  github: 'github.com',
  'frontend-mentor': 'frontendmentor.io',
  twitter: 'twitter.com',
  linkedin: 'linkedin.com',
  youtube: 'youtube.com',
  facebook: 'facebook.com',
  twitch: 'twitch.tv',
  devto: 'dev.to',
  codewars: 'codewars.com',
  codepen: 'codepen.io',
  freecodecamp: 'freecodecamp.org',
  gitlab: 'gitlab.com',
  hashnode: 'hashnode.com',
  'stack-overflow': 'stackoverflow.com'
};

export default {
  name: 'CustomizeLinks',
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  data() {
    return {
      availableLinks,
      links: [],
      errors: [],
      loading: true,
      inSubmission: false
    };
  },
  components: { LinkForm, LoadingSpinner },
  computed: {
    ...mapWritableState(useUserStore, ['toast', 'currentUser', 'userLoggedIn']),
    valuesUnchanged() {
      return JSON.stringify(this.links) === JSON.stringify(this.currentUser.links);
    }
  },
  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    validateLinks() {},
    onAddNewLink() {
      if (this.links) {
        this.links.push({
          id: new Date().getTime().toString(),
          order: this.links.length + 1,
          platform: 'Github',
          url: '',
          code: 'github'
        });
      } else {
        this.links = [
          {
            id: new Date().getTime().toString(),
            order: 1,
            platform: 'Github',
            url: '',
            code: 'github'
          }
        ];
      }
    },
    onEditLink(index, link) {
      this.links[index] = link;
    },
    onRemoveLink(id) {
      this.links = this.links.filter((link) => link.id !== id);
    },
    async saveLinks() {
      this.inSubmission = true;
      this.errors = [];

      this.links.forEach((link) => {
        if (!link.url) {
          link.error = `Please provide the ${link.platform} link`;
          this.errors = [...this.errors, link.error];
        } else if (link.url && !link.url.includes(linkValidator[link.code])) {
          link.error = `This is not a  ${link.platform} link`;
          this.errors = [...this.errors, link.error];
        } else {
          delete link.error;
        }
      });

      if (this.errors.length > 0) {
        this.inSubmission = false;
        return;
      }

      if (this.valuesUnchanged) {
        this.inSubmission = false;
        this.toast = {
          show: true,
          message: 'Values Unchanged',
          variant: 'bg-white'
        };
        return;
      }

      this.links = this.links.map((link, index) => ({ ...link, order: index + 1 }));

      this.toast = {
        show: true,
        message: 'Updating details....',
        variant: 'bg-white'
      };

      try {
        await this.updateUserDetails({ links: this.links });

        this.toast = {
          show: true,
          message: 'Succesfully updated details',
          variant: 'bg-green-400'
        };
      } catch (error) {
        this.toast = {
          show: true,
          message: 'Error Updating details',
          variant: 'bg-red-400'
        };
      }
      this.inSubmission = false;
    }
  },
  watch: {
    loading: function () {
      if (!this.loading) {
        this.links = this.currentUser.links ? [...this.currentUser.links] : [];
      }
    },
    currentUser: function () {
      this.links = this.currentUser.links ? [...this.currentUser.links] : [];
    }
  }
};
</script>
