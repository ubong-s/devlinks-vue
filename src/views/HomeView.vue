<template>
  <div class="bg-white h-screen overflow-hidden">
    <div class="relative">
      <nav
        class="absolute top-8 left-4 right-4 flex justify-between items-center rounded-lg gap-8 p-4 md:px-6"
      >
        <!-- LOGO START-->
        <RouterLink :to="{ name: 'home' }">
          <img src="/assets/logo-devlinks-large.svg" alt="" class="w-[165px]" />
        </RouterLink>
        <!-- LOGO END-->

        <RouterLink
          v-if="!userLoggedIn"
          :to="{ name: 'login' }"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </nav>
      <div class="mx-auto max-w-3xl h-screen flex flex-col justify-center">
        <div class="text-center p-4 px-8 md:px-6">
          <h1 class="text-4xl font-bold tracking-tight text-[#333333] sm:text-6xl">
            Manage your social links
          </h1>
          <p class="mt-6 text-lg leading-8 text-[#333333]">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-8 flex items-center justify-center gap-x-6">
            <RouterLink
              v-if="userLoggedIn"
              :to="{ name: 'profile' }"
              class="border-2 rounded-lg text-lg border-primary-blue text-center py-3 px-5 mb-4 md:px-8 bg-primary-blue text-white tracking-wider"
            >
              Go to Profile
            </RouterLink>
            <RouterLink
              v-else
              :to="{ name: 'register' }"
              class="border-2 rounded-lg text-lg border-primary-blue text-center py-3 px-5 mb-4 md:px-8 bg-primary-blue text-white tracking-wider"
            >
              Get Started
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
  name: 'HomeView',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  }
};
</script>
