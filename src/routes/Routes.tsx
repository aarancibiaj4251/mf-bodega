import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import CheckOutPage from '../pages/checkout/CheckOut.component';
import CheckOutPayment from '../pages/checkout-payment/CheckOutPayment.component';
import ReportPage from '../pages/report/Report.component';
import ProductList from '../pages/products/list-products/ProductList.component';
import UserInformation from '../components/user/user-information/user-information.component';
import LotteryPage from '../pages/lottery/Lottery.component';
import App from '../App';
import UsersPageComponent from '../pages/users/UsersPage.component';
import NoAuthorizedPage from '../pages/no-authorized/NoAuthorizedPage';
import ProtectedRoute from '../components/auth/ProtectedRoute.component';
import {initKeyCloakLoader} from '../data/loaders/authKeycloakLoader';
import AdministrationPage from '../pages/administration/Administration.component';

const routes = createBrowserRouter([
    {
      path: '/', loader: initKeyCloakLoader,
      element: <App />,
      children: [
        {path: '/', element: <Navigate to="/shop" replace />},
        {path: '/shop', element: <ShopPage />},
        {
          path: '/cart',
          children: [
            {path: '/cart', element: <CheckOutPage />},
            {path: '/cart/pago', element: <CheckOutPayment />},
          ],
        },
        {
          path: '/portal',
          children: [
            {path: '/portal/orders', element: <UserInformation />},
          ],
        },
        {
          path: '/administration',
          element: <ProtectedRoute><AdministrationPage /></ProtectedRoute>,
          children: [
            {path: '/administration/reports', element: <ReportPage />},
            {path: '/administration/users', element: <UsersPageComponent />},
          ],
        },
        {
          path: '/inventory',
          element: <ProtectedRoute><AdministrationPage /></ProtectedRoute>,
          children: [
            {path: '/inventory/products', element: <ProductList />},
          ],
        },
        {path: '/sorteo', element: <LotteryPage />},
        {path: '/no-authorized', element: <NoAuthorizedPage />},
      ]
    },
    {path: '/*', element: <div>Pagina no encontrada</div>},
  ], {basename: '/bodega-project'});

  export default routes;
