import { defineStore } from 'pinia';
import { auth, usersCollection } from '../includes/firebase';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    currentUser: {}
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
    async register(values) {
      const usernameSnapshot = await usersCollection.where('username', '==', values.username).get();

      if (!usernameSnapshot.empty) {
        throw Error('This username is already taken!');
      }

      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.doc(userCred.user.uid).set({
        username: values.username,
        email: values.email
      });

      this.currentUser = await this.getUser(userCred.user.uid);
      this.userLoggedIn = true;
    },
    async authenticate(values) {
      const userCred = await auth.signInWithEmailAndPassword(values.email, values.password);

      this.currentUser = await this.getUser(userCred.user.uid);
      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();

      this.currentUser = {};
      this.userLoggedIn = false;
    }
  }
});
