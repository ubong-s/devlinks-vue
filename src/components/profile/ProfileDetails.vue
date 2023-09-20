<template>
  <div class="">
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
        <VeeForm
          ref="formDetails"
          id="profile-details"
          :validation-schema="schema"
          :initial-values="{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            workEmail: currentUser.workEmail
          }"
          @submit="updateUser"
        >
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label name="firstName" class="text-sm font-semibold text-gray-400">First Name</label>
            <VeeField
              name="firstName"
              type="text"
              class="rounded-lg py-3 px-4 border border-gray-200 col-span-2 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
            />
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label name="lastName" class="text-sm font-bold text-gray-400">Last Name</label>
            <VeeField
              name="lastName"
              type="text"
              class="rounded-lg py-3 px-4 border border-gray-200 col-span-2 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
            />
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label class="text-sm font-bold text-gray-400">Work Email</label>
            <VeeField
              name="workEmail"
              type="text"
              class="rounded-lg py-3 px-4 border border-gray-200 col-span-2 focus:shadow-primary-blue focus:border-primary-blue focus:outline-none"
            />
          </div>
        </VeeForm>
      </div>
      <!-- Profile Details Form  End -->
    </div>
    <hr />
    <div class="flex px-4 py-8 rounded-lg bg-white md:p-10 md:justify-end">
      <button
        form="profile-details"
        type="submit"
        class="border-2 rounded-lg border-primary-blue text-center text-white bg-primary-blue font-medium py-3 px-5 w-full md:px-8 hover:opacity-90 transition-colors md:w-min"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '../../stores/user';
import ProfileImage from './ProfileImage.vue';

export default {
  name: 'ProfileDetails',
  data() {
    return {
      schema: {
        firstName: '',
        lastName: '',
        workEmail: ''
      },
      inSubmission: false
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['toast', 'currentUser'])
  },
  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    async updateUser(values) {
      this.inSubmission = true;
      this.toast = {
        show: true,
        message: 'Updating details....',
        variant: 'bg-white'
      };

      if (
        values.firstName === this.currentUser.firstName &&
        values.lastName === this.currentUser.lastName &&
        values.workEmail === this.currentUser.workEmail
      ) {
        this.inSubmission = false;
        this.toast = {
          show: true,
          message: 'Values Unchanged',
          variant: 'bg-white'
        };
        return;
      }

      try {
        await this.updateUserDetails({
          firstName: values.firstName,
          lastName: values.lastName,
          workEmail: values.workEmail
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
  components: { ProfileImage }
};
</script>
