import { RouterOptions, createRouter, createWebHashHistory } from 'vue-router'

const router: RouterOptions = {
  routes: [
    { path: '/login', component: () => import('../view/TheLogin.vue') },
    {
      path: '/nav', component: () => import('../view/TheNavBar.vue'),
      children: [
        { path: 'main', name: 'main', component: () => import('../view/TheMain.vue') },
        {
          path: 'shop', name: 'shop', redirect: '/nav/shop/course', component: () => import('../view/TheShop.vue'), children: [
            { path: 'course', component: () => import('../view/shop/TheCourse.vue') },
            { path: 'thing', component: () => import('../view/shop/TheThing.vue') }
          ]
        },
        { path: 'translation', name: 'translation', component: () => import('../view/TheTranslation.vue') },
        {
          path: 'community', name: 'community', redirect: '/nav/community/recommend', component: () => import('../view/TheCommunity.vue'), children: [
            { path: 'job', component: () => import('../view/community/TheJob.vue') },
            { path: 'recommend', component: () => import('../view/community/TheRecommend.vue') },
            { path: 'community', component: () => import('../view/community/TheCommunity.vue') }
          ]
        },
        { path: 'me', name: 'me', component: () => import('../view/TheMe.vue') },
      ]
    },
    { path: '/setting', component: () => import('../view/me/TheSettings.vue') },
    { path: '/edit_info', component: () => import('../view/me/TheEditInfo.vue') },
    { path: '/change_password', component: () => import('../view/me/TheChangePassword.vue') },
    { path: '/publish_topic', component: () => import('../view/community/ThePublishTopic.vue') }
  ],
  history: createWebHashHistory()
}

export default createRouter(router)
