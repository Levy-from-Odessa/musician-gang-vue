import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/client/Index'
import Register from '@/components/client/Register'
import Login from '@/components/client/Login'

import Store from '@/components/client/Store'
import Events from '@/components/client/Events'
import Event from '@/components/client/Event'
import Products from '@/components/client/Products'
import Media from '@/components/client/Media'
import Tours from '@/components/client/Tours'
import Tour from '@/components/client/Tour'
import Basket from '@/components/client/Basket'

import CreateGood from '@/components/admin/CreateGood'
import CreateUser from '@/components/admin/CreateUser'
import CreateAuthor from '@/components/admin/CreateAuthor'
import CreateBookmark from '@/components/admin/CreateBookmark'
import CreateConcert from '@/components/admin/CreateConcert'
import CreateGang from '@/components/admin/CreateGang'
import CreateMailing from '@/components/admin/CreateMailing'
import CreateUserMailing from '@/components/admin/CreateUserMailing'
import CreateMedia from '@/components/admin/CreateMedia'
import CreateMusic from '@/components/admin/CreateMusic'
import createMusicProg from '@/components/admin/createMusicProg'
import CreateTour from '@/components/admin/CreateTour'

Vue.use(Router)

export default new Router({
  routes: [
    // !client
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/event/:eventId',
      name: 'Event',
      component: Event
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/media',
      name: 'Media',
      component: Media
    },
    {
      path: '/basket',
      name: 'Basket',
      component: Basket
    },
    {
      path: '/tours',
      name: 'Tours',
      component: Tours
    },
    {
      path: '/tour/:tour',
      name: 'Tour',
      component: Tour
    },
    // !admin
    {
      path: '/admin/createGood',
      name: 'CreateGood',
      component: CreateGood
    },
    {
      path: '/admin/createUser',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/admin/CreateAuthor',
      name: 'CreateAuthor',
      component: CreateAuthor
    },
    {
      path: '/admin/CreateBookmark',
      name: 'CreateBookmark',
      component: CreateBookmark
    },
    {
      path: '/admin/CreateConcert',
      name: 'CreateConcert',
      component: CreateConcert
    },
    {
      path: '/admin/CreateGang',
      name: 'CreateGang',
      component: CreateGang
    },
    {
      path: '/admin/CreateMailing',
      name: 'CreateMailing',
      component: CreateMailing
    },
    {
      path: '/admin/CreateMedia',
      name: 'CreateMedia',
      component: CreateMedia
    },
    {
      path: '/admin/CreateMusic',
      name: 'CreateMusic',
      component: CreateMusic
    },
    {
      path: '/admin/CreateUserMailing',
      name: 'CreateUserMailing',
      component: CreateUserMailing
    },
    {
      path: '/admin/createMusicProg',
      name: 'createMusicProg',
      component: createMusicProg
    },
    {
      path: '/admin/CreateTour',
      name: 'CreateTour',
      component: CreateTour
    }
  ]
})
