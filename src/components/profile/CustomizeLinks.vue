<template>
  <div>
    <div class="px-4 py-12 rounded-lg bg-white md:p-10 md:pb-20">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Customize your links</h2>
      <p class="mb-10 text-gray-400 lg:text-lg">
        Add/edit/remove links below and then share all your profiles with the world
      </p>
      <!-- Add New Link Button -->
      <button
        @click="addNewLink"
        class="w-full border-2 rounded-lg border-primary-blue text-center text-primary-blue font-bold py-3 px-5 mb-4 md:px-8 hover:bg-primary-blue hover:text-white transition-colors"
      >
        + Add new link
      </button>

      <div
        v-if="!links.length"
        class="bg-neutral-50 flex flex-col gap-8 rounded-lg items-center text-center p-4 md:p-8 lg:p-16"
      >
        <img src="/assets/illustration-empty.svg" alt="No Links Image" class="" />
        <h2 class="text-2xl font-bold md:text-3xl">Let's get you started</h2>
        <p>
          Use the "Add new link" button to get started. Once you have more than one link, you can
          reorder and edit them. We're here to help you share you profiles with everyone!
        </p>
        <button
          @click="addNewLink"
          class="border-2 rounded-lg border-primary-blue text-center font-bold py-3 px-5 mb-4 md:px-8 bg-primary-blue text-white hover:bg-transparent hover:text-primary-blue transition-colors"
        >
          + Add new link
        </button>
      </div>
      <!-- Links START -->
      <ul v-else>
        <li
          v-for="(link, i) in links"
          :key="link.id"
          class="p-4 bg-neutral-50 rounded-lg mt-4 md:p-6 lg:p-8 lg:mt-8"
        >
          <div class="flex items-center justify-between text-gray-400">
            <p class="flex items-center gap-2">
              <img src="/assets/icon-drag-and-drop.svg" alt="" />
              Link #{{ i + 1 }}
            </p>
            <button class="font-semibold hover:text-primary-blue" @click="removeLink(link.id)">
              Remove
            </button>
          </div>
          <!-- Form Start -->
          <form>
            <div class="flex flex-col gap-2 mt-4">
              <label class="text-sm font-bold text-gray-400">Platform</label>
              <input type="text" class="rounded-lg py-3 px-4 border border-gray-200" />
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <label class="text-sm font-bold text-gray-400">Link</label>
              <input type="text" class="rounded-lg py-3 px-4 border border-gray-200" />
            </div>
          </form>
          <!-- Form End -->
        </li>
      </ul>
      <!-- Links END -->
    </div>
    <div v-show="links.length">
      <hr />
      <div class="flex px-4 py-8 rounded-lg bg-white md:p-10 md:justify-end">
        <button
          class="border-2 rounded-lg border-primary-blue text-center text-white bg-primary-blue font-medium py-3 px-5 w-full md:px-8 hover:bg-transparent hover:text-primary-blue transition-colors md:w-min"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomizeLinks',
  data() {
    return {
      links: []
    }
  },
  methods: {
    addNewLink() {
      this.links.push({
        id: new Date().getTime().toString(),
        platform: '',
        link: ''
      })
    },
    removeLink(id) {
      console.log('before>>>>>>>>', this.links)
      this.links = this.links.filter((link) => link.id !== id)
      console.log('after>>>>>>>>', this.links)
    }
  }
}
</script>
