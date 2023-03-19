import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { DataTableProvider } from '~/contexts/DataTableContext';
import MainLayout from '~/layouts/main';
import DashboardLayout from '~/layouts/dashboard';
import LogoOnlyLayout from '~/layouts/LogoOnlyLayout';
import Loadable from '~/components/Loadable';
import RequireAuth from '~/pages/auth/RequireAuth';
import { ROLES } from '~/config';
import { PATH_MODULES } from './paths';

const { ADMINISTRADOR, EMPLEADO_VENTAS } = ROLES;

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/dashboard/productos" replace /> },
        {
          path: 'app',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <App />
            </RequireAuth>
          ),
        },
        // customers
        {
          path: 'clientes',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DataTableProvider>
                <Customers />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'clientes/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <AddCustomerForm />
            </RequireAuth>
          ),
        },
        {
          path: 'clientes/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <ModifyCustomerForm />
            </RequireAuth>
          ),
        },
        // employees
        {
          path: 'empleados',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Employees />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'empleados/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddEmployeesForm />
            </RequireAuth>
          ),
        },
        {
          path: 'empleados/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyEmployeesForm />
            </RequireAuth>
          ),
        },
        // categories
        {
          path: 'categorias',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Categories />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'categorias/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddCategoriesForm />
            </RequireAuth>
          ),
        },
        {
          path: 'categorias/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyCategoriesForm />{' '}
            </RequireAuth>
          ),
        },
        // Brands
        {
          path: 'marcas',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Brands />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'marcas/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddBrandForm />
            </RequireAuth>
          ),
        },
        {
          path: 'marcas/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyBrandForm />
            </RequireAuth>
          ),
        },
        // Products
        {
          path: 'productos',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DataTableProvider>
                <Products />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'productos/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddProductsForm />
            </RequireAuth>
          ),
        },
        {
          path: 'productos/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyProductsForm />
            </RequireAuth>
          ),
        },
        // Providers
        {
          path: 'proveedores',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Providers />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'proveedores/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddProvidersForm />
            </RequireAuth>
          ),
        },
        {
          path: 'proveedores/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyProvidersForm />
            </RequireAuth>
          ),
        },
        // Subsidiaries
        {
          path: 'sucursales',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Subsidiaries />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'sucursales/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <AddSubsidiariesForm />
            </RequireAuth>
          ),
        },
        {
          path: 'sucursales/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifySubsidiariesForm />
            </RequireAuth>
          ),
        },
        // Discounts
        {
          path: 'descuentos',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DataTableProvider>
                <Discounts />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'descuentos/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <AddDiscountsForm />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'descuentos/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <ModifyDiscountsForm />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: `${PATH_MODULES.discounts.detail}/:id`,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DetailDiscounts />
            </RequireAuth>
          ),
        },
        // Sells
        {
          path: 'ventas',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DataTableProvider>
                <Sells />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: 'ventas/nuevo',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <AddSellsForm />
            </RequireAuth>
          ),
        },
        {
          path: 'ventas/modificar/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <ModifySellsForm />
            </RequireAuth>
          ),
        },
        {
          path: 'ventas/detalle/:id',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DetailSells />
            </RequireAuth>
          ),
        },
        // Purchases
        {
          path: PATH_MODULES.purchases.root,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DataTableProvider>
                <Purchases />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: PATH_MODULES.purchases.new,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              {' '}
              <AddPurchasesForm />
            </RequireAuth>
          ),
        },
        {
          path: `${PATH_MODULES.purchases.modify}/:id`,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <ModifyPurchasesForm />
            </RequireAuth>
          ),
        },
        {
          path: `${PATH_MODULES.purchases.detail}/:id`,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <DetailPurchases />{' '}
            </RequireAuth>
          ),
        },
        // reports
        {
          path: PATH_MODULES.reports.products,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <InventoryReport />
            </RequireAuth>
          ),
        },
        {
          path: PATH_MODULES.reports.sales,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              {' '}
              <SalesReport />
            </RequireAuth>
          ),
        },
        {
          path: PATH_MODULES.reports.purchases,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <PurchasesReport />
            </RequireAuth>
          ),
        },
        // generalManagement
        {
          path: 'administracion/dosificacion-facturas',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <InvoiceBatchingForm />
            </RequireAuth>
          ),
        },
        {
          path: 'administracion/datos-negocio',
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id]}>
              <BusinessDataForm />
            </RequireAuth>
          ),
        },
        // defective products
        {
          path: PATH_MODULES.defectiveProducts.root,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <DataTableProvider>
                <DefectiveProducts />
              </DataTableProvider>
            </RequireAuth>
          ),
        },
        {
          path: PATH_MODULES.defectiveProducts.new,
          element: (
            <RequireAuth allowedRoles={[ADMINISTRADOR.id, EMPLEADO_VENTAS.id]}>
              <AddDefectiveProductsForm />
            </RequireAuth>
          ),
        },
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
        { path: `${PATH_MODULES.shop.discounts}/:id`, element: <ShopDiscounts /> },
        { path: `${PATH_MODULES.shop.products}/:id`, element: <ShopProductDetail /> },
        { path: `${PATH_MODULES.shop.products}`, element: <ShopProducts /> },
        { path: `${PATH_MODULES.shop.checkout}`, element: <ShopCheckout /> },
        // static
        { path: `${PATH_MODULES.staticPages.about}`, element: <ShopAbout /> },
        { path: `${PATH_MODULES.staticPages.frequentlAskedQuestions}`, element: <ShopFrequenlyAskedQuestions /> },
        { path: `${PATH_MODULES.staticPages.warranties}`, element: <ShopWarranties /> },
        { path: `${PATH_MODULES.staticPages.devolutions}`, element: <ShopDevolutions /> },
        { path: `${PATH_MODULES.staticPages.termConditions}`, element: <ShopTermConditions /> },
        // auth
        { path: `${PATH_MODULES.auth.signIn}`, element: <Login /> },
        { path: `${PATH_MODULES.auth.signUp}`, element: <Register /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: PATH_MODULES.auth.unauthorized, element: <Unauthorized /> },
  ]);
}

// IMPORT COMPONENTS
// discounts
const Discounts = Loadable(lazy(() => import('~/pages/discounts/Discounts')));
const AddDiscountsForm = Loadable(lazy(() => import('~/pages/discounts/AddDiscountsForm')));
const ModifyDiscountsForm = Loadable(lazy(() => import('~/pages/discounts/ModifyDiscountsForm')));
const DetailDiscounts = Loadable(lazy(() => import('~/pages/discounts/DetailDiscounts')));
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
// purchases
const Purchases = Loadable(lazy(() => import('~/pages/purchases/Purchases')));
const AddPurchasesForm = Loadable(lazy(() => import('~/pages/purchases/AddPurchasesForm')));
const ModifyPurchasesForm = Loadable(lazy(() => import('~/pages/purchases/ModifyPurchasesForm')));
const DetailPurchases = Loadable(lazy(() => import('~/pages/purchases/DetailPurchases')));
// defectiveProducts
const DefectiveProducts = Loadable(lazy(() => import('~/pages/defectiveProducts/DefectiveProducts')));
const AddDefectiveProductsForm = Loadable(lazy(() => import('~/pages/defectiveProducts/AddDefectiveProductsForm')));

// reports
const InventoryReport = Loadable(lazy(() => import('~/pages/reports/InventoryReport')));
const SalesReport = Loadable(lazy(() => import('~/pages/reports/SalesReport')));
const PurchasesReport = Loadable(lazy(() => import('~/pages/reports/PurchasesReport')));
// general options
const InvoiceBatchingForm = Loadable(lazy(() => import('~/pages/generalManagement/InvoiceBatchingForm')));
const BusinessDataForm = Loadable(lazy(() => import('~/pages/generalManagement/BusinessDataForm')));
// shop
const Shop = Loadable(lazy(() => import('~/pages/shop/Shop')));
const BestSelling = Loadable(lazy(() => import('~/pages/shop/BestSellingProducts')));
const ShopDiscounts = Loadable(lazy(() => import('~/pages/shop/ShopDiscounts')));
const ShopCategories = Loadable(lazy(() => import('~/pages/shop/ShopCategories')));
const ShopProductDetail = Loadable(lazy(() => import('~/pages/shop/ShopProductDetail')));
const ShopCheckout = Loadable(lazy(() => import('~/pages/shop/ShopCheckout')));
const ShopProducts = Loadable(lazy(() => import('~/pages/shop/ShopProducts')));
// static shop
const ShopAbout = Loadable(lazy(() => import('~/pages/shop/staticPages/ShopAbout')));
const ShopWarranties = Loadable(lazy(() => import('~/pages/shop/staticPages/ShopWarranties')));
const ShopDevolutions = Loadable(lazy(() => import('~/pages/shop/staticPages/ShopDevolutions')));
const ShopTermConditions = Loadable(lazy(() => import('~/pages/shop/staticPages/ShopTermConditions')));
const ShopFrequenlyAskedQuestions = Loadable(
  lazy(() => import('~/pages/shop/staticPages/ShopFrequenlyAskedQuestions')),
);
// auth
const Login = Loadable(lazy(() => import('~/pages/auth/Login')));
const Register = Loadable(lazy(() => import('~/pages/auth/Register')));
const Unauthorized = Loadable(lazy(() => import('~/pages/Unauthorized')));

const NotFound = Loadable(lazy(() => import('~/pages/Page404')));
// Main
