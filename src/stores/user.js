import { defineStore } from 'pinia';
import { auth, usersCollection } from '../includes/firebase';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),

  actions: {
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

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();

      this.userLoggedIn = false;
    }
  }
});
