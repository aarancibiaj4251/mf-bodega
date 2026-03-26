import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import router from './routes/Routes';
import {GoogleOAuthProvider} from '@react-oauth/google';
import './config/axios/axios.interceptor';

export default function Root(_) {
  return <GoogleOAuthProvider clientId="141628866238-r50i8v0com33f5m3u6if5lan8b184tl1.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>;
}
