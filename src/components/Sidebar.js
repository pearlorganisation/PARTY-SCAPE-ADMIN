import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
// -------------------------------------------------------------------------------

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    pathname && console.log('pathname value = ', pathname);
  }, [pathname]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <h2 className="text-white text-3xl font-bold text-center">
            Party Scape Admin Panel
          </h2>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden mr-4 text-white"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
            

             
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/roles/viewRoles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <GridViewOutlinedIcon/>
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/theaters"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/roles/viewRoles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <CelebrationOutlinedIcon/>
                  Manage Theaters
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  to="/cakes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/roles/viewRoles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <CakeOutlinedIcon/>
                  Manage Cakes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/prospectiveCustomer"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/roles/viewRoles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <AdminPanelSettingsOutlinedIcon/>
                  Manage Prospective Customers
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  to="/bookings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/roles/viewRoles') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <PeopleOutlinedIcon/>
                  Manage Bookings
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/bookingStatus"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/payments/viewPayments') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >

                 <CardMembershipOutlinedIcon/>
                  Booking Status
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payments/viewPayments"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('/payments/viewPayments') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >

                 <PaymentOutlinedIcon/>
                  Manage Payments
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
