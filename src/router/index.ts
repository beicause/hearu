import { RouterOptions, createRouter, createWebHashHistory } from 'vue-router'

const router: RouterOptions = {
  routes: [
    { path: '/login', component: () => import('../view/TheLogin.vue') },
    {
      path: '/nav', component: () => import('../view/TheNavBar.vue'),
      children: [
        { path: 'main', component: () => import('../view/TheMain.vue') },
        { path: 'course', component: () => import('../view/TheCourse.vue') },
        { path: 'translation', component: () => import('../view/TheTranslationShoot.vue') },
        { path: 'community', component: () => import('../view/TheCommunity.vue') },
        { path: 'me', component: () => import('../view/TheMe.vue') }
      ]
    }
  ],
  history: createWebHashHistory()
}

export default createRouter(router)
