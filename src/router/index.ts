import Vue from 'vue';
import VueRouter from 'vue-router';

import EventbooksView from '@/views/EventboksView.vue';
import EventSelector from '@/components/eventboks/EventSelector.vue';
import EventRating from '@/components/eventboks/EventRating.vue';
import EventFinished from '@/components/eventboks/EventFinished.vue'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AuthenticatedLayout,
    children: [
      {
        path: '',
        name: 'eventbooks',
        component: EventbooksView,
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
