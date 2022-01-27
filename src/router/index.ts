import { RouterOptions, createRouter, createWebHashHistory } from 'vue-router'

const router: RouterOptions = {
  routes: [
    { path: '/login', component: () => import('../view/TheLogin.vue') },
    {
      path: '/nav', component: () => import('../view/TheNavBar.vue'),
      children: [
        { path: 'main', name: 'main', component: () => import('../view/TheMain.vue') },
        { path: 'shop', name: 'shop', component: () => import('../view/TheShop.vue') },
        { path: 'translation', name: 'translation', component: () => import('../view/TheTranslation.vue') },
        { path: 'community', name: 'community', component: () => import('../view/TheCommunity.vue') },
        { path: 'me', name: 'me', component: () => import('../view/TheMe.vue') }
      ]
    }
  ],
  history: createWebHashHistory()
}

export default createRouter(router)
