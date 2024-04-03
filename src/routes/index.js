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




// const Calendar = lazy(() => import('../pages/Calendar'));
// const Chart = lazy(() => import('../pages/Chart'));
// const FormElements = lazy(() => import('../pages/Form/FormElements'));
// const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
// const Tables = lazy(() => import('../pages/Tables'));
// const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
// const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
// ------------------------------------------------------------------------------

// New Routes

const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));



const CreateRole = lazy(() =>
  import('../pages/Authentication/roles/CreateRole')
);
const ViewRoles = lazy(() => import('../pages/Authentication/roles/ViewRoles'));
const UpdateRole = lazy(() =>
  import('../pages/Authentication/roles/UpdateRole')
);

const CreatePermission = lazy(() =>
  import('../pages/Authentication/permissions/CreatePermission')
);
const ViewPermissions = lazy(() =>
  import('../pages/Authentication/permissions/ViewPermissions')
);
const UpdatePermission = lazy(() =>
  import('../pages/Authentication/permissions/UpdatePermission')
);

// ------------------------------------------------------------------------------
const coreRoutes = [
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  // {
  //   path: "/forms/form-elements",
  //   title: "Forms Elements",
  //   component: FormElements,
  // },
  // {
  //   path: "/forms/form-layout",
  //   title: "Form Layouts",
  //   component: FormLayout,
  // },
  // {
  //   path: "/tables",
  //   title: "Tables",
  //   component: Tables,
  // },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  // {
  //   path: "/chart",
  //   title: "Chart",
  //   component: Chart,
  // },
  // {
  //   path: "/ui/alerts",
  //   title: "Alerts",
  //   component: Alerts,
  // },
  // {
  //   path: "/ui/buttons",
  //   title: "Buttons",
  //   component: Buttons,
  // },
  // ------------------------------------------------------------------------------

  // New Routes
  // Users Routes
 
  {
    path: '/users/viewUsers',
    title: 'View Users',
    component: ViewUsers,
  },
  {
    path: '/auth/signin',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/auth/signup',
    title: 'Signup',
    component:SignUp,
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
