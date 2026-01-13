import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Encyclopedia from '../pages/Encyclopedia.vue'
import Reading from '../pages/Reading.vue'
import ReadingResult from '../pages/ReadingResult.vue'
import Collection from '../pages/Collection.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/encyclopedia',
    name: 'Encyclopedia',
    component: Encyclopedia,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/reading',
    name: 'Reading',
    component: Reading,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/reading/result',
    name: 'ReadingResult',
    component: ReadingResult,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      transition: 'fade'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
