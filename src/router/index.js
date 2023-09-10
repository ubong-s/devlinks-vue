import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PreviewView from '@/views/PreviewView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile/preview',
      name: 'preview',
      component: PreviewView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        userLoggedOut: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        userLoggedOut: true
      }
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth) {
    if (userStore.userLoggedIn) {
      next();
    } else {
      next({ name: 'login' });
    }
    return;
  }

  if (to.meta.userLoggedOut) {
    if (!userStore.userLoggedIn) {
      next();
    } else {
      next({ name: 'profile' });
    }
    return;
  }

  next();
});

export default router;
