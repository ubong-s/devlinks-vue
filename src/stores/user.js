import { defineStore } from 'pinia';
import { auth, usersCollection } from '../includes/firebase';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    currentUser: {},
    links: [],
    profileDetails: {},
    toast: {
      show: false,
      message: '',
      variant: ''
    }
  }),

  actions: {
    async getUser(uid) {
      try {
        const docRef = await usersCollection.doc(uid).get();

        return docRef.exists ? docRef.data() : {};
      } catch (error) {
        console.log('Error getting document:', error);
      }
    },
    async getUserByUsername(username) {
      let user;
      try {
        const userSnapshot = await usersCollection.where('username', '==', username).get();
        await userSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          user = doc.data();
        });

        return user;
      } catch (error) {
        console.log('Error getting document:', error);
      }
    },
    async register(values) {
      const usernameSnapshot = await usersCollection.where('username', '==', values.username).get();

      if (!usernameSnapshot.empty) {
        throw Error('This username is already taken!');
      }

      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.doc(userCred.user.uid).set({
        uid: userCred.user.uid,
        username: values.username,
        email: values.email,
        workEmail: values.workEmail
      });

      const userData = await this.getUser(userCred.user.uid);

      this.currentUser = { ...userData };
      this.links = [...userData.links];
      this.profileDetails = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        workEmail: userData.workEmail
      };
      this.userLoggedIn = true;
    },
    async authenticate(values) {
      const userCred = await auth.signInWithEmailAndPassword(values.email, values.password);

      const userData = await this.getUser(userCred.user.uid);

      this.currentUser = { ...userData };
      this.links = [...userData.links];
      this.profileDetails = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        workEmail: userData.workEmail
      };
      this.userLoggedIn = true;
    },
    async updateUserDetails(values) {
      delete values.email;
      await usersCollection.doc(auth.currentUser.uid).update(values);
      await auth.currentUser.updateProfile({
        displayName: `${values.firstNaame} ${values.lastName}`
      });

      this.currentUser = { ...this.currentUser, ...values };
    },
    async signOut() {
      await auth.signOut();

      this.currentUser = {};
      this.userLoggedIn = false;
    },
    async shareLink() {
      const url =
        import.meta.env.MODE === 'production'
          ? import.meta.env.VITE_PUBLIC_URL
          : 'http://127.0.0.1:5173';

      console.log(import.meta.env.MODE);

      let text = `${url}/user/${this.currentUser.username}`;
      await navigator.clipboard.writeText(text);

      this.toast = {
        show: true,
        message: 'Link copied',
        variant: 'bg-green-400'
      };
    }
  }
});
