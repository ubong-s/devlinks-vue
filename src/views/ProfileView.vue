<template>
  <UserBar v-if="userLoggedIn" :currentUser="currentUser" />
  <section>
    <div class="relative flex flex-col gap-4 p-4 md:px-6 md:py-6 md:gap-8 w-full">
      <!-- Profile Navigation-->
      <ProfileNav :tab="tab" @select-tab="selectTab" />

      <!-- Device Preview and Links START -->
      <div class="grid gap-4 lg:flex lg:gap-8 relative">
        <!--Device Preview -->
        <DevicePreview />

        <!-- Tabbed Section -->
        <div class="lg:flex-1">
          <CustomizeLinks v-if="tab === 'links'" />
          <ProfileDetails v-else />
        </div>
      </div>
      <!-- Device Preview and Links END -->
    </div>
  </section>
  <ToastBar />
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/stores/user';
import UserBar from '@/components/UserBar.vue';
import ProfileNav from '@/components/profile/ProfileNav.vue';
import DevicePreview from '@/components/profile/DevicePreview.vue';
import CustomizeLinks from '@/components/profile/CustomizeLinks.vue';
import ProfileDetails from '@/components/profile/ProfileDetails.vue';
import ToastBar from '../components/profile/ToastBar.vue';

export default {
  name: 'ProfileView',
  data() {
    return {
      tab: 'links',
      loading: false
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'currentUser'])
  },
  methods: {
    selectTab(value) {
      this.tab = value;
    }
  },
  created() {
    const { tab } = this.$route.query;

    this.tab = tab === 'links' || tab === 'details' ? tab : 'links';

    this.$router.push({
      query: {
        tab: this.tab
      }
    });
  },
  watch: {
    tab(value) {
      if (value === this.$route.query.tab) {
        return;
      }

      this.$router.push({
        query: {
          tab: value
        }
      });
    }
  },
  components: { ProfileNav, DevicePreview, CustomizeLinks, ProfileDetails, ToastBar, UserBar }
};
</script>
