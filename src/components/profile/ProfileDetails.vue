<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-full w-full rounded-lg bg-white min-h-[50vh]"
  >
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="px-4 py-12 rounded-lg bg-white md:p-10 md:pb-20 lg:flex-1">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Profile Details</h2>
      <p class="mb-10 text-gray-400 lg:text-lg">
        Add your details to create a personal touch to your profile
      </p>
      <!-- Profile Image START-->
      <ProfileImage />
      <!-- Profile Image END-->

      <!-- Profile Details Form Start -->
      <div class="rounded-lg bg-neutral-50 p-4 mt-8 md:p-8">
        <form id="profile-details" @submit.prevent="updateUser">
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label name="firstName" class="text-sm font-semibold text-gray-400">First Name</label>
            <div class="col-span-2">
              <input
                name="firstName"
                type="text"
                class="w-full rounded-lg py-3 px-4 border border-gray-200 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
                v-model="profileDetails.firstName"
                :class="{ 'border-red-400': !profileDetails.firstName }"
              />
              <div v-if="!profileDetails.firstName" class="text-sm mt-0.5 italic text-red-400">
                first name is required
              </div>
            </div>
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label name="lastName" class="text-sm font-bold text-gray-400">Last Name</label>
            <div class="col-span-2">
              <input
                name="lastName"
                type="text"
                class="w-full rounded-lg py-3 px-4 border border-gray-200 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
                v-model="profileDetails.lastName"
                :class="{ 'border-red-400': !profileDetails.lastName }"
              />
              <div v-if="!profileDetails.lastName" class="text-sm mt-0.5 italic text-red-400">
                last name is required
              </div>
            </div>
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label class="text-sm font-bold text-gray-400">Work Email</label>
            <div class="col-span-2">
              <input
                name="workEmail"
                type="text"
                class="w-full rounded-lg py-3 px-4 border border-gray-200 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
                v-model="profileDetails.workEmail"
                :class="{ 'border-red-400': !profileDetails.workEmail }"
              />
              <div v-if="!profileDetails.workEmail" class="text-sm mt-0.5 italic text-red-400">
                Work email is required
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- Profile Details Form  End -->
    </div>
    <hr />
    <div class="flex px-4 py-8 rounded-lg bg-white md:p-10 md:justify-end">
      <button
        form="profile-details"
        type="submit"
        class="border-2 rounded-lg border-primary-blue text-center text-white bg-primary-blue font-medium py-3 px-5 w-full md:px-8 hover:opacity-90 transition-colors md:w-min"
        :disabled="valuesUnchanged || inSubmission || valueEmpty"
        :class="{
          'opacity-50 disabled:cursor-not-allowed': inSubmission || valuesUnchanged || valueEmpty,
          'hover:opacity-80': !valuesUnchanged || !valueEmpty
        }"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';
import ProfileImage from '@/components/profile/ProfileImage.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'ProfileDetails',
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  data() {
    return {
      loading: true,
      inSubmission: false
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['toast', 'currentUser', 'profileDetails']),
    valuesUnchanged() {
      return (
        JSON.stringify(this.profileDetails) ===
        JSON.stringify({
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          workEmail: this.currentUser.workEmail
        })
      );
    },
    valueEmpty() {
      return (
        !this.profileDetails.firstName ||
        !this.profileDetails.lastName ||
        !this.profileDetails.workEmail
      );
    }
  },
  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    async updateUser() {
      this.inSubmission = true;
      this.toast = {
        show: true,
        message: 'Updating details....',
        variant: 'bg-white'
      };

      try {
        await this.updateUserDetails({
          firstName: this.profileDetails.firstName,
          lastName: this.profileDetails.lastName,
          workEmail: this.profileDetails.workEmail
        });
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
  components: { ProfileImage, LoadingSpinner }
};
</script>
