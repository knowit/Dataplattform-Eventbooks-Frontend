import Vue, { CreateElement } from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import EventboksView from '@/views/EventboksView.vue';
import EventSelector from '@/components/EventSelect/EventSelector.vue';
import EventRating from '@/components/EventRating/EventRating.vue';
import EventFinished from '@/components/EventRating/EventFinished.vue';
import AdminView from '@/views/AdminView.vue';
import AdminEvents from '@/components/Admin/AdminEvents.vue';

import CallbackView from '@/views/CallbackView.vue';
import SignInView from '@/views/SignInView.vue';
import { signinCallbackGuard, signinSilentCallbackGuard } from './callbacks';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: { name: 'Base', render: (h: CreateElement) => h('router-view') },
    redirect: { name: 'eventSelector' },
    children: [
      {
        path: 'callback/signin',
        component: CallbackView,
        beforeEnter: signinCallbackGuard
      },
      {
        path: 'callback/signin/silent',
        component: { render: (h: CreateElement) => h('div') },
        beforeEnter: signinSilentCallbackGuard
      },
      {
        path: 'authadmin/signin',
        name: 'signin',
        component: SignInView
      },
      {
        path: 'authadmin',
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
        path: 'admin',
        name: 'admin',
        component: AdminView,
      },
      {
        path: 'event',
        component: EventboksView,
        redirect: { name: 'eventSelector' },
        children: [
          {
            path: 'select',
            name: 'eventSelector',
            component: EventSelector
          },
          {
            path: ':eventId',
            component: { render: (h: CreateElement) => h('router-view') },
            redirect: { name: 'eventRating' },
            children: [
              {
                path: 'rate',
                name: 'eventRating',
                component: EventRating,
                props: true
              },
              {
                path: 'finished',
                name: 'eventFinished',
                component: EventFinished,
                props: true
              }
            ]
          },
          {
            path: 'event/finished',
            name: 'eventFinished',
            component: EventFinished
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
