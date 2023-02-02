import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { DataTableProvider } from '~/contexts/DataTableContext';
import MainLayout from '~/layouts/main';
import DashboardLayout from '~/layouts/dashboard';
import LogoOnlyLayout from '~/layouts/LogoOnlyLayout';
import Loadable from '~/components/Loadable';
import { PATH_MODULES } from './paths';

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
        {
          path: 'clientes',
          element: (
            <DataTableProvider>
              <Customers />
            </DataTableProvider>
          ),
        },
        { path: 'clientes/nuevo', element: <AddCustomerForm /> },
        { path: 'clientes/modificar/:id', element: <ModifyCustomerForm /> },
        // employees
        {
          path: 'empleados',
          element: (
            <DataTableProvider>
              <Employees />
            </DataTableProvider>
          ),
        },
        { path: 'empleados/nuevo', element: <AddEmployeesForm /> },
        { path: 'empleados/modificar/:id', element: <ModifyEmployeesForm /> },
        // categories
        {
          path: 'categorias',
          element: (
            <DataTableProvider>
              <Categories />
            </DataTableProvider>
          ),
        },
        { path: 'categorias/nuevo', element: <AddCategoriesForm /> },
        { path: 'categorias/modificar/:id', element: <ModifyCategoriesForm /> },
        // Brands
        {
          path: 'marcas',
          element: (
            <DataTableProvider>
              <Brands />
            </DataTableProvider>
          ),
        },
        { path: 'marcas/nuevo', element: <AddBrandForm /> },
        { path: 'marcas/modificar/:id', element: <ModifyBrandForm /> },
        // Products
        {
          path: 'productos',
          element: (
            <DataTableProvider>
              <Products />
            </DataTableProvider>
          ),
        },
        { path: 'productos/nuevo', element: <AddProductsForm /> },
        { path: 'productos/modificar/:id', element: <ModifyProductsForm /> },
        // Providers
        {
          path: 'proveedores',
          element: (
            <DataTableProvider>
              <Providers />
            </DataTableProvider>
          ),
        },
        { path: 'proveedores/nuevo', element: <AddProvidersForm /> },
        { path: 'proveedores/modificar/:id', element: <ModifyProvidersForm /> },
        // Subsidiaries
        {
          path: 'sucursales',
          element: (
            <DataTableProvider>
              <Subsidiaries />
            </DataTableProvider>
          ),
        },
        { path: 'sucursales/nuevo', element: <AddSubsidiariesForm /> },
        { path: 'sucursales/modificar/:id', element: <ModifySubsidiariesForm /> },
        // Discounts
        {
          path: 'descuentos',
          element: (
            <DataTableProvider>
              <Discounts />
            </DataTableProvider>
          ),
        },
        {
          path: 'descuentos/nuevo',
          element: (
            <DataTableProvider>
              <AddDiscountsForm />
            </DataTableProvider>
          ),
        },
        {
          path: 'descuentos/modificar/:id',
          element: (
            <DataTableProvider>
              <ModifyDiscountsForm />{' '}
            </DataTableProvider>
          ),
        },
        // Sells
        {
          path: 'ventas',
          element: (
            <DataTableProvider>
              <Sells />
            </DataTableProvider>
          ),
        },
        { path: 'ventas/nuevo', element: <AddSellsForm /> },
        { path: 'ventas/modificar/:id', element: <ModifySellsForm /> },
        { path: 'ventas/detalle/:id', element: <DetailSells /> },
        // reports
        { path: 'reportes/inventario', element: <InventoryReport /> },
        // { path: 'reportes/datos-negocio', element: <BusinessDataForm /> }
        // generalManagement
        { path: 'administracion/dosificacion-facturas', element: <InvoiceBatchingForm /> },
        { path: 'administracion/datos-negocio', element: <BusinessDataForm /> },
        // {
        //   path: 'reportes',
        //   children: [
        //     {
        //       path: '/',
        //       element: <Navigate to="/dashboard/reportes/ventas"
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Shop /> },
        { path: `${PATH_MODULES.shop.categories}`, element: <Navigate to="/" /> },
        { path: `${PATH_MODULES.shop.categories}/:url`, element: <ShopCategories /> },
        { path: PATH_MODULES.shop.bestSelling, element: <BestSelling /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS
// discounts
const Discounts = Loadable(lazy(() => import('~/pages/discounts/Discounts')));
const AddDiscountsForm = Loadable(lazy(() => import('~/pages/discounts/AddDiscountsForm')));
const ModifyDiscountsForm = Loadable(lazy(() => import('~/pages/discounts/ModifyDiscountsForm')));
// customers
const Customers = Loadable(lazy(() => import('~/pages/customers/Customers')));
const AddCustomerForm = Loadable(lazy(() => import('~/pages/customers/AddCustomerForm')));
const ModifyCustomerForm = Loadable(lazy(() => import('~/pages/customers/ModifyCustomerForm')));
const App = Loadable(lazy(() => import('~/pages/App')));
// employees
const Employees = Loadable(lazy(() => import('~/pages/employees/Employees')));
const AddEmployeesForm = Loadable(lazy(() => import('~/pages/employees/AddEmployeesForm')));
const ModifyEmployeesForm = Loadable(lazy(() => import('~/pages/employees/ModifyEmployeesForm')));
// categories
const Categories = Loadable(lazy(() => import('~/pages/categories/Categories')));
const AddCategoriesForm = Loadable(lazy(() => import('~/pages/categories/AddCategoriesForm')));
const ModifyCategoriesForm = Loadable(lazy(() => import('~/pages/categories/ModifyCategoriesForm')));
// brands
const Brands = Loadable(lazy(() => import('~/pages/brands/Brands')));
const AddBrandForm = Loadable(lazy(() => import('~/pages/brands/AddBrandForm')));
const ModifyBrandForm = Loadable(lazy(() => import('~/pages/brands/ModifyBrandForm')));
// products
const Products = Loadable(lazy(() => import('~/pages/products/Products')));
const AddProductsForm = Loadable(lazy(() => import('~/pages/products/AddProductsForm')));
const ModifyProductsForm = Loadable(lazy(() => import('~/pages/products/ModifyProductsForm')));
// providers
const Providers = Loadable(lazy(() => import('~/pages/providers/Providers')));
const AddProvidersForm = Loadable(lazy(() => import('~/pages/providers/AddProvidersForm')));
const ModifyProvidersForm = Loadable(lazy(() => import('~/pages/providers/ModifyProvidersForm')));
// subsidiaries
const Subsidiaries = Loadable(lazy(() => import('~/pages/subsidiaries/Subsidiaries')));
const AddSubsidiariesForm = Loadable(lazy(() => import('~/pages/subsidiaries/AddSubsidiariesForm')));
const ModifySubsidiariesForm = Loadable(lazy(() => import('~/pages/subsidiaries/ModifySubsidiariesForm')));
// sells
const Sells = Loadable(lazy(() => import('~/pages/sells/Sells')));
const AddSellsForm = Loadable(lazy(() => import('~/pages/sells/AddSellsForm')));
const ModifySellsForm = Loadable(lazy(() => import('~/pages/sells/ModifySellsForm')));
const DetailSells = Loadable(lazy(() => import('~/pages/sells/DetailSells')));
// reports
const InventoryReport = Loadable(lazy(() => import('~/pages/reports/InventoryReport')));
// const BusinessDataForm = Loadable(lazy(() => import('~/pages/generalManagement/BusinessDataForm')));
// generalManagement
const InvoiceBatchingForm = Loadable(lazy(() => import('~/pages/generalManagement/InvoiceBatchingForm')));
const BusinessDataForm = Loadable(lazy(() => import('~/pages/generalManagement/BusinessDataForm')));
// shop
const Shop = Loadable(lazy(() => import('~/pages/shop/Shop')));
const BestSelling = Loadable(lazy(() => import('~/pages/shop/BestSellingProducts')));
const ShopCategories = Loadable(lazy(() => import('~/pages/shop/ShopCategories')));

const NotFound = Loadable(lazy(() => import('~/pages/Page404')));
// Main
