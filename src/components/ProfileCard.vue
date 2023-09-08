<template>
  <div class="flex-1 flex justify-center pt-10 pb-20 md:py-28">
    <!-- Profile Card -->
    <div class="py-12 px-14 md:rounded-3xl w-[365px] md:bg-white md:shadow-xl">
      <!-- Profile Image -->
      <div
        class="rounded-full h-[120px] w-[120px] mx-auto overflow-hidden border-4 border-primary-blue mb-6"
      >
        <img src="./assets/sample.png" alt="sample" class="object-center" />
      </div>

      <!-- Profile Name and Email -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold mb-4">Ben Wright</h1>
        <p class="text-gray-600">benwright@gmail.com</p>
      </div>

      <!-- Profile Links -->
      <ul class="flex flex-col gap-5">
        <li>
          <a
            href="#"
            class="bg-black p-4 border-2 border-black text-white rounded-lg flex justify-between items-center"
          >
            <span class="flex items-center gap-2">
              <span>
                <!-- Social Icon -->
                <IconGithub />
              </span>
              Github
            </span>
            <span>
              <!-- Arrow Right -->
              <IconArrowRight />
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="bg-black p-4 border-2 border-black text-white rounded-lg flex justify-between items-center"
          >
            <span class="flex items-center gap-2">
              <span>
                <!-- Social Icon -->
                <IconGithub />
              </span>
              Github
            </span>
            <span>
              <!-- Arrow Right -->
              <IconArrowRight />
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="bg-black p-4 border-2 border-black text-white rounded-lg flex justify-between items-center"
          >
            <span class="flex items-center gap-2">
              <span>
                <!-- Social Icon -->
                <IconGithub />
              </span>
              Github
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
import IconArrowRight from './icons/IconArrowRight.vue'
import IconGithub from './icons/IconGithub.vue'

export default {
  name: 'ProfileCard',
  components: { IconGithub, IconArrowRight }
}
</script>
