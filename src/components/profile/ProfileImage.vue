<template>
  <div>
    <div
      class="flex flex-col gap-4 items-start bg-neutral-50 px-4 py-8 rounded-lg md:p-8 md:grid md:grid-cols-3 md:gap-8 md:items-center"
    >
      <p class="text-sm font-semibold text-gray-400">Profile Image</p>
      <div class="relative rounded-lg">
        <div
          v-if="currentUser.imageUrl"
          class="relative group rounded-lg w-[200px] h-full lg:w-full overflow-hidden"
        >
          <img v-show="currentUser.imageUrl" :src="currentUser.imageUrl" class="w-full" alt="" />
          <label
            for="upload-image-2"
            class="cursor-pointer absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] text-white opacity-50 flex flex-col gap-2 items-center justify-center hover:bg-[rgba(0,0,0,0.9)] transition-colors"
            :class="{ 'bg-[rgba(0,0,0,0.9)]': isDragOver }"
            @drag.prevent.stop=""
            @dragstart.prevent.stop=""
            @dragend.prevent.stop="isDragOver = false"
            @dragover.prevent.stop="isDragOver = true"
            @dragenter.prevent.stop="isDragOver = true"
            @dragleave.prevent.stop="isDragOver = false"
            @drop.prevent.stop="upload($event)"
            @change="upload($event)"
          >
            <input
              type="file"
              hidden
              id="upload-image-2"
              accept="image/png, image/bmp, image/jpeg"
            />
            <IconUploadImage classes="fill-white w-10" />
            <p>Change Image</p>
          </label>
        </div>
        <div
          v-else
          class="rounded-lg border-2 bg-[#EFECFF] w-[200px] lg:w-full"
          :class="{ 'text-primary-blue border-primary-blue border-2 font-bold': isDragOver }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDragOver = false"
          @dragover.prevent.stop="isDragOver = true"
          @dragenter.prevent.stop="isDragOver = true"
          @dragleave.prevent.stop="isDragOver = false"
          @drop.prevent.stop="upload($event)"
        >
          <label
            for="upload-image"
            class="group flex flex-col gap-4 items-center text-center cursor-pointer py-12 px-8 hover:text-primary-blue transition-colors"
            @change="upload($event)"
          >
            <input type="file" hidden id="upload-image" accept="image/png, image/bmp, image/jpeg" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
            >
              <path
                d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                class="group-hover:fill-primary-blue transition-colors"
                :class="{
                  'fill-primary-blue': isDragOver,
                  'fill-neutral-400': !isDragOver
                }"
              />
            </svg>
            <p>
              + Upload Image
              <span class="block">(Click/Dragover)</span>
            </p>
          </label>
        </div>

        <!-- Upload Progress Bar -->
        <div v-show="task.variant" class="bg-white h-1 w-full mb-4 rounded-lg overflow-hidden mt-2">
          <div
            class="transition-all progress-bar bg-blue-400 h-full"
            :class="task.variant"
            :style="{ width: task.current_progress + '%' }"
          ></div>
        </div>
      </div>
      <div>
        <p class="text-sm">Image must be below 1024 X 1024px. Use PNG,JPG or BMP format</p>
        <p v-show="showUploadAlert" :class="uploadAlertVariant">{{ uploadAlertMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia';
import { storage } from '../../includes/firebase';
import { useUserStore } from '../../stores/user';
import IconUploadImage from '../icons/IconUploadImage.vue';

export default {
  name: 'ProfileImage',
  data() {
    return {
      task: {},
      isDragOver: false,

      imageWidth: 0,
      imageHeight: 0
    };
  },
  computed: { ...mapWritableState(useUserStore, ['currentUser', 'toast']) },
  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    async upload($event) {
      this.task = {};
      this.isDragOver = false;
      this.toast = {
        show: false,
        message: '',
        variant: 'bg-black'
      };

      // Check upload method >>>> Click OR DragOver
      const file = $event.dataTransfer ? $event.dataTransfer.files[0] : $event.target.files[0];
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        this.toast = {
          show: true,
          message: 'File size is more than 2MB',
          variant: 'bg-red-500'
        };

        return;
      }
      // Check file type
      if (!file.type.startsWith('image')) {
        this.toast = {
          show: true,
          message: 'File type is not allowed. Use PNG,JPG or BMP format',
          variant: 'bg-red-500'
        };

        return;
      }
      // Check image size does not exceed "1024 X 1024px"
      let image = new Image();
      image.src = window.URL.createObjectURL(file);
      image.onload = () => {
        this.imageWidth = image.width;
        this.imageHeight = image.height;
        // Check Image dimensions
        if (this.imageWidth > 1024 || this.imageHeight > 1024) {
          this.toast = {
            show: true,
            message: `Image dimensions are "${this.imageWidth} X ${this.imageHeight}px". Must be below 1024 X 1024px`,
            variant: 'bg-red-500'
          };

          return;
        }
        // Check image file type
        if (file.type !== 'image/bmp' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
          this.toast = {
            show: true,
            message: `File type "${file.type.substr(6)}" is not allowed. Use PNG,JPG or BMP format`,
            variant: 'bg-red-500'
          };

          return;
        }
        window.URL.revokeObjectURL(image.src);
        // Firebase
        const storageRef = storage.ref();
        const imageFilename = `${this.currentUser.username}-${new Date().getTime()}`;
        const userImagesRef = storageRef.child(`users/${imageFilename}`);
        const uploadTask = userImagesRef.put(file);
        this.task = {
          uploadTask,
          current_progress: 0,
          variant: 'bg-primary-blue'
        };
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.task.current_progress = progress;
          },
          (error) => {
            this.task.variant = 'bg-red-500';

            this.toast = {
              show: true,
              message: 'Error uploading image',
              variant: 'bg-red-500'
            };
            console.log(error);
          },
          async () => {
            const profileImage = await uploadTask.snapshot.ref.getDownloadURL();
            if (this.currentUser.imageFilename) {
              await storage.ref(`users/${this.currentUser.imageFilename}`).delete();
            }
            await this.updateUserDetails({
              imageFilename,
              imageUrl: profileImage
            });

            // Success Alert Message
            this.task.variant = 'bg-green-500';
            this.toast = {
              show: true,
              message: 'Successfully uploaded image',
              variant: 'bg-green-500'
            };
          }
        );
      };
    }
  },
  watch: {
    task() {
      if (this.task.variant) {
        this.task.variant = '';
      }
    }
  },
  components: { IconUploadImage }
};
</script>
