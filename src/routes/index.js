import { lazy } from 'react';
import ViewTheater from '../pages/theater/viewTheater';
import {ViewCake} from '../pages/Cake/ViewCake';

import { CreateCake } from '../pages/Cake/CreateCake';
import {UpdateCeremony} from '../pages/Ceremony/UpdateCeremony';
import { ViewCeremony } from '../pages/Ceremony/ViewCeremony';
import { CreateCeremony } from '../pages/Ceremony/CreateCeremony';
import CreateTheater from '../pages/theater/CreateTheater';
import UpdateTheater from '../pages/theater/UpdateTheater';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import ViewBooking from '../pages/Booking/ViewBooking';
import CreateBooking from '../pages/Booking/CreateBooking';
import { UpdateCake } from '../pages/Cake/UpdateCake';



const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));



// ------------------------------------------------------------------------------

// New Routes

const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));




// ------------------------------------------------------------------------------
const coreRoutes = [

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  // {
 
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
 
  // ------------------------------------------------------------------------------

  // New Routes
  // Users Routes
 
  {
    path: '/users/viewUsers',
    title: 'View Users',
    component: ViewUsers,
  },

  

  //theater routes
  {
    path: '/theaters',
    title: 'view theater',
    component: ViewTheater,
  },
 
  {
    path: '/updateTheater/:id',
    title: 'edit theater',
    component: UpdateTheater,
  },
  {
    path: '/createTheater',
    title: 'create theater',
    component: CreateTheater,
  },
  // Booking Routes
  {
    path: '/bookings',
    title: 'view booking',
    component: ViewBooking,
  },
  {
    path: '/createBooking',
    title: 'create booking',
    component: CreateBooking,
  },

  //Cake routes
  {
    path: '/cakes',
    title: 'view cake',
    component: ViewCake,
  },
  {
    path: '/updateCake/:id',
    title: 'edit cake',
    component: UpdateCake,
  },
  {
    path: '/createCake',
    title: 'create cake',
    component: CreateCake,
  },
  //Ceremony routes
  {
    path: '/ceremony',
    title: 'view ceremony',
    component: ViewCeremony,
  },
  {
    path: '/updateCeremony/:id',
    title: 'edit ceremony',
    component: UpdateCeremony,
  },
  {
    path: '/createCeremony',
    title: 'create ceremony',
    component: CreateCeremony,
  },
 


];

const routes = [...coreRoutes];
export default routes;
