import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import CheckOutPage from '../pages/checkout/CheckOut.component';
import CheckOutPayment from '../pages/checkout-payment/CheckOutPayment.component';
import ReportPage from '../pages/report/Report.component';
import ProductList from '../pages/products/list-products/ProductList.component';
import UserInformation from '../components/user/user-information/user-information.component';
import LotteryPage from '../pages/lottery/Lottery.component';
import SignInSignOutPage from '../pages/sign-in-sign-out/SignInSignOut.component';
import App from '../App';

const routes = createBrowserRouter([
    {
      path: '/', element: <App />, children: [
        {path: '/', element: <ShopPage />},
        {path: '/carrito', element: <CheckOutPage />},
        {path: '/carrito/pago', element: <CheckOutPayment />},
        {path: '/reporte', element: <ReportPage />},
        {path: '/productos', element: <ProductList />},
        {path: '/informacion', element: <UserInformation />},
        {path: '/sorteo', element: <LotteryPage />},
      ]
    },
    {path: '/login', element: <SignInSignOutPage />},
    {path: '/*', element: <div>Pagina no encontrada</div>},
  ], {basename: '/bodega-project'});

  export default routes;
