import React from 'react';
import './App.scss';
import Spinner from "./components/spinner/Spinner.component";
import {useDispatch, useSelector} from 'react-redux';
import {selectLoader} from "./redux/loader/loader.selector";
import ModalLotteryNotificationComponent
  from './components/modal-lottery-notification/modal-lottery-notification.component';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from './data/rest/query-client.config';
import Navigation from './routes/Navigation';
import keycloak from './auth/keycloak.config';
import {User} from './domain/interfaces/user/User';
import {login as loginSlice} from './redux/user/userSlice';

const App = () => {
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();

  keycloak.init({
    pkceMethod: 'S256',
    redirectUri: process.env.KEYCLOAK_INIT_REDIRECT_URL,
    onLoad: 'check-sso',
  })
    .then(async (initSuccess: boolean) => {
      if (initSuccess) {
        const userProfile = await keycloak.loadUserProfile();
        const user = {
          email: userProfile.email,
          givenName: userProfile.given_name,
          lastName: userProfile.family_name,
          username: userProfile.email,
          isGoogleAccount: false,
        } as User;
        dispatch(loginSlice(user))
      }
    })
    .catch(err => console.log('init error', err));

  return (
      <>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <Navigation />
          {
              loader && (
                  <div className="spinner">
                      <Spinner size={"large"}/>
                  </div>
              )
          }
        <ModalLotteryNotificationComponent />
        </QueryClientProvider>
      </>
  );
}

export default App;
