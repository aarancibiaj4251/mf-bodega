import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
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

const routes = createBrowserRouter([
    {
      path: '/', loader: initKeyCloakLoader, element: <App />, children: [
        {path: '/', element: <ShopPage />},
        {path: '/carrito', element: <CheckOutPage />},
        {path: '/carrito/pago', element: <CheckOutPayment />},
        {path: '/reporte', element: <ProtectedRoute><ReportPage /></ProtectedRoute>},
        {path: '/productos', element: <ProtectedRoute><ProductList /></ProtectedRoute>},
        {path: '/informacion', element: <UserInformation />},
        {path: '/sorteo', element: <LotteryPage />},
        {path: '/users', element: <ProtectedRoute>
            <UsersPageComponent />
          </ProtectedRoute>},
        {path: '/no-authorized', element: <NoAuthorizedPage />},
      ]
    },
    {path: '/*', element: <div>Pagina no encontrada</div>},
  ], {basename: '/bodega-project'});

  export default routes;
