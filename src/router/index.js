import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Route Guard: Home');
      next();
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Route Guard: About');
      next();
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/UserView.vue'),
    props: true
  },
  {
    path: '/parent',
    component: () => import('../views/ParentView.vue'),
    children: [
      {
        path: 'child',
        component: () => import('../views/child/ChildView.vue'),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: { template: '<div>404 - Page Not Found</div>' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
