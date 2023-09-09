<template>
  <!--Device Preview START -->
  <div
    class="hidden rounded-lg bg-white lg:flex items-center justify-center h-screen p-16 xl:w-[500px] 2xl:w-[590px] sticky top-2"
  >
    <div class="relative h-[500px] overflow-hidden">
      <div class="absolute left-0 top-0 w-full h-full py-12 px-7">
        <!-- Profile Image -->
        <div
          class="rounded-full h-[75px] w-[75px] mx-auto overflow-hidden border-2 border-primary-blue mb-4"
        >
          <img src="/assets/sample.png" alt="sample" class="object-center" />
        </div>

        <!-- Profile Name and Email -->
        <div class="text-center mb-9">
          <h1 class="font-bold mb-0 w-full bg-white">Ben Wright</h1>
          <p class="text-gray-600 text-sm w-full bg-white">benwright@gmail.com</p>
        </div>

        <!-- Profile Links -->
        <ul class="flex flex-col gap-4">
          <li>
            <a
              href="#"
              class="bg-black px-2 py-[6px] border-2 w-full border-black text-sm text-white rounded-lg flex justify-between items-center"
            >
              <span class="flex items-center gap-2">
                <span>
                  <!-- Social Icon -->
                  <IconGithub classes="w-3 h-3" />
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
              class="bg-black px-2 py-[6px] border-2 w-full border-black text-sm text-white rounded-lg flex justify-between items-center"
            >
              <span class="flex items-center gap-2">
                <span>
                  <!-- Social Icon -->
                  <IconGithub classes="w-3 h-3" />
                </span>
                Github
              </span>
              <span>
                <!-- Arrow Right -->
                <IconArrowRight classes="w-3 h-3" />
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="bg-black px-2 py-[6px] border-2 w-full border-black text-sm text-white rounded-lg flex justify-between items-center"
            >
              <span class="flex items-center gap-2">
                <span>
                  <!-- Social Icon -->
                  <IconGithub classes="w-3 h-3" />
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
      <img src="/assets/illustration-phone-mockup.svg" alt="" class="h-full w-full" />
    </div>
  </div>
  <!--Device Preview END -->
</template>

<script setup>
import IconArrowRight from '../icons/IconArrowRight.vue'
import IconGithub from '../icons/IconGithub.vue'
</script>

<style lang="scss" scoped></style>
