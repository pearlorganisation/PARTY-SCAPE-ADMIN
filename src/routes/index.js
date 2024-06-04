import { lazy } from 'react';
import ViewTheater from '../pages/theater/viewTheater';
import { ViewCake } from '../pages/Cake/ViewCake';
import { CreateCake } from '../pages/Cake/CreateCake';
import { UpdateCeremony } from '../pages/Ceremony/UpdateCeremony';
import { ViewCeremony } from '../pages/Ceremony/ViewCeremony';
import { CreateCeremony } from '../pages/Ceremony/CreateCeremony';
import CreateTheater from '../pages/theater/CreateTheater';
import UpdateTheater from '../pages/theater/UpdateTheater';
import ViewBooking from '../pages/Booking/ViewBooking';
import CreateBooking from '../pages/Booking/CreateBooking';
import { UpdateCake } from '../pages/Cake/UpdateCake';
import { ProspectiveCustomers } from '../pages/ProspectiveCustomer/ProspectiveCustomers';
import { components } from 'react-select';
import AvailableSlots from '../pages/AvailableSlots';
import UpdateBooking from '../pages/Booking/UpdateBooking';

// ------------------------------------------------------------------------------

// New Routes

const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));

// ------------------------------------------------------------------------------
const coreRoutes = [
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
  {
    path: '/updateBooking/:bookingId',
    title: 'Update Booking',
    component: UpdateBooking,
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
  //
  {
    path: '/prospectiveCustomer',
    title: 'view prospectiveCustomers',
    component: ProspectiveCustomers,
  },
  {
    path: '/availableSlots',
    title: 'view available slots',
    component: AvailableSlots,
  },
];

const routes = [...coreRoutes];
export default routes;
