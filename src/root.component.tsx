import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import router from './routes/Routes';
import './config/axios/axios.interceptor';

export default function Root(_) {
  return <Provider store={store}>
    <PersistGate persistor={persistor} >
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>;
}
