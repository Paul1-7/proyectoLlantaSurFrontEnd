import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <App /> },
        // customers
        { path: 'clientes', element: <Customers /> },
        { path: 'clientes/nuevo', element: <AddCustomerForm /> },
        { path: 'clientes/modificar/:id', element: <ModifyCustomerForm /> },
        // employees
        { path: 'empleados', element: <Employees /> },
        { path: 'empleados/nuevo', element: <AddEmployeesForm /> },
        { path: 'empleados/modificar/:id', element: <ModifyEmployeesForm /> }
        // {
        //   path: 'reportes',
        //   children: [
        //     {
        //       path: '/',
        //       element: <Navigate to="/dashboard/reportes/ventas" replace />
        //     },
        //     { path: 'ventas', element: <PageFour /> },
        //     { path: 'five', element: <PageFive /> },
        //     { path: 'six', element: <PageSix /> }
        //   ]
        // }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Customers = Loadable(lazy(() => import('../pages/customers/Customers')));
const AddCustomerForm = Loadable(lazy(() => import('../pages/customers/AddCustomerForm.js')));
const ModifyCustomerForm = Loadable(lazy(() => import('../pages/customers/ModifyCustomerForm')));
const App = Loadable(lazy(() => import('../pages/App')));
const Employees = Loadable(lazy(() => import('../pages/employees/Employees')));
const AddEmployeesForm = Loadable(lazy(() => import('../pages/employees/AddEmployeesForm.js')));
const ModifyEmployeesForm = Loadable(lazy(() => import('../pages/employees/ModifyEmployeesForm')));

const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
