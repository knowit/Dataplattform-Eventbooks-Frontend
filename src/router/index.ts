import Vue from 'vue';
import VueRouter from 'vue-router';

import EventboksView from '@/views/EventboksView.vue';
import EventSelector from '@/components/eventboks/EventSelector.vue';
import EventRating from '@/components/eventboks/EventRating.vue';
import EventFinished from '@/components/eventboks/EventFinished.vue';
import AdminView from '@/views/AdminView.vue';
import AdminEvents from '@/components/admin/AdminEvents.vue';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AuthenticatedLayout,
    children: [
      {
        path: '',
        name: 'eventboks',
        component: EventboksView,
        children: [
          {
            path: '/',
            redirect: { name: 'eventSelector' }
          },
          {
            path: 'select',
            name: 'eventSelector',
            component: EventSelector
          },
          {
            path: 'event/:eventId',
            name: 'eventRating',
            component: EventRating,
            props: true
          },
          {
            path: 'finished',
            name: 'eventFinished',
            component: EventFinished
          }
        ]
      },
      {
        path: 'admin',
        name: 'admin',
        component: AdminView,
        children: [
          {
            path: '/',
            redirect: { name: 'adminEvents' }
          },
          {
            path: 'events',
            name: 'adminEvents',
            component: AdminEvents
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
