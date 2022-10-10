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
        { path: 'empleados/modificar/:id', element: <ModifyEmployeesForm /> },
        // categories
        { path: 'categorias', element: <Categories /> },
        { path: 'categorias/nuevo', element: <AddCategoriesForm /> },
        { path: 'categorias/modificar/:id', element: <ModifyCategoriesForm /> },
        // Brands
        { path: 'marcas', element: <Brands /> },
        { path: 'marcas/nuevo', element: <AddBrandForm /> },
        { path: 'marcas/modificar/:id', element: <ModifyBrandForm /> },
        // Products
        { path: 'productos', element: <Products /> },
        { path: 'productos/nuevo', element: <AddProductsForm /> },
        { path: 'productos/modificar/:id', element: <ModifyProductsForm /> },
        // Providers
        { path: 'proveedores', element: <Providers /> },
        { path: 'proveedores/nuevo', element: <AddProvidersForm /> },
        { path: 'proveedores/modificar/:id', element: <ModifyProvidersForm /> },
        // Subsidiaries
        { path: 'sucursales', element: <Subsidiaries /> },
        { path: 'sucursales/nuevo', element: <AddSubsidiariesForm /> },
        { path: 'sucursales/modificar/:id', element: <ModifySubsidiariesForm /> },
        // Sells
        { path: 'ventas', element: <Sells /> },
        { path: 'ventas/nuevo', element: <AddSellsForm /> },
        { path: 'ventas/modificar/:id', element: <ModifySellsForm /> }
        // {
        //   path: 'reportes',
        //   children: [
        //     {
        //       path: '/',
        //       element: <Navigate to="/dashboard/reportes/ventas"
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

// customers
const Customers = Loadable(lazy(() => import('../pages/customers/Customers')));
const AddCustomerForm = Loadable(lazy(() => import('../pages/customers/AddCustomerForm.js')));
const ModifyCustomerForm = Loadable(lazy(() => import('../pages/customers/ModifyCustomerForm')));
const App = Loadable(lazy(() => import('../pages/App')));
// employees
const Employees = Loadable(lazy(() => import('../pages/employees/Employees')));
const AddEmployeesForm = Loadable(lazy(() => import('../pages/employees/AddEmployeesForm.js')));
const ModifyEmployeesForm = Loadable(lazy(() => import('../pages/employees/ModifyEmployeesForm')));
// categories
const Categories = Loadable(lazy(() => import('../pages/categories/Categories')));
const AddCategoriesForm = Loadable(lazy(() => import('../pages/categories/AddCategoriesForm.js')));
const ModifyCategoriesForm = Loadable(lazy(() => import('../pages/categories/ModifyCategoriesForm')));
// brands
const Brands = Loadable(lazy(() => import('../pages/brands/Brands')));
const AddBrandForm = Loadable(lazy(() => import('../pages/brands/AddBrandForm.js')));
const ModifyBrandForm = Loadable(lazy(() => import('../pages/brands/ModifyBrandForm')));
// products
const Products = Loadable(lazy(() => import('../pages/products/Products')));
const AddProductsForm = Loadable(lazy(() => import('../pages/products/AddProductsForm.js')));
const ModifyProductsForm = Loadable(lazy(() => import('../pages/products/ModifyProductsForm')));
// providers
const Providers = Loadable(lazy(() => import('../pages/providers/Providers')));
const AddProvidersForm = Loadable(lazy(() => import('../pages/providers/AddProvidersForm.js')));
const ModifyProvidersForm = Loadable(lazy(() => import('../pages/providers/ModifyProvidersForm')));
// subsidiaries
const Subsidiaries = Loadable(lazy(() => import('../pages/subsidiaries/Subsidiaries')));
const AddSubsidiariesForm = Loadable(lazy(() => import('../pages/subsidiaries/AddSubsidiariesForm.js')));
const ModifySubsidiariesForm = Loadable(lazy(() => import('../pages/subsidiaries/ModifySubsidiariesForm')));
// sells
const Sells = Loadable(lazy(() => import('../pages/sells/Sells')));
const AddSellsForm = Loadable(lazy(() => import('../pages/sells/AddSellsForm')));
const ModifySellsForm = Loadable(lazy(() => import('../pages/sells/ModifySellsForm')));

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
