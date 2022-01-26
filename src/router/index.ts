import { RouterOptions, createRouter, createWebHashHistory } from 'vue-router'

const router: RouterOptions = {
  routes: [
    { path: '/', component: () => import('../view/TheLogin.vue') }
  ],
  history: createWebHashHistory()
}

export default createRouter(router)
