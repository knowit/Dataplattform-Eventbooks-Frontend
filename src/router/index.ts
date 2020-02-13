import Vue, { CreateElement } from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import EventboksView from '@/views/EventboksView.vue';
import EventSelectView from '@/views/EventSelectView.vue';
import EventRatingView from '@/views/EventRatingView.vue';
import EventSelector from '@/components/EventSelect/EventSelector.vue';
import EventRating from '@/components/EventRating/EventRating.vue';
import EventRatingFinished from '@/components/EventRating/EventRatingFinished.vue';
import AdminView from '@/views/AdminView.vue';
import AdminEvents from '@/components/Admin/AdminEvents.vue';

import CallbackView from '@/views/CallbackView.vue';
import SignInView from '@/views/SignInView.vue';
import { signinCallbackGuard, signinSilentCallbackGuard, eventNavigationGuard } from './callbacks';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/authadmin/signin',
    name: 'signin',
    component: SignInView
  },
  {
    path: '/authadmin',
    name: 'authadmin',
    component: AdminView,
    children: [
      {
        // Example of child route
        path: 'relativePathToAdmin',
        name: 'REMEMBERME',
        component: {
          render: (h: CreateElement) => h('div', 'Example child')
        } // Or component like below,
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
  // This should always be last
  {
    path: '/',
    component: EventSelectView,
    redirect: 'select',
    children: [
      {
        path: '',
        name: 'select',
        component: EventSelector,
        props: ((r) => { redirect: !!r.query.r; }),
      },
      {
        path: 'finished',
        name: 'eventRatingFinished',
        component: EventRatingFinished,
        props: true
      },
      // This should always be last among the children
      // {
      //   path: ':eventId',
      //   name: 'eventRating',
      //   component: EventRating,
      //   props: true,
      // },
    ],
  },
  {
    path: '/:eventCode',
    name: 'eventRating',
    component: EventRatingView,
    props: true,
    beforeEnter: eventNavigationGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
