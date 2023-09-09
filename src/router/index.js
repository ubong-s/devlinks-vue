import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PreviewView from '@/views/PreviewView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';

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
      component: PreviewView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});

export default router;
