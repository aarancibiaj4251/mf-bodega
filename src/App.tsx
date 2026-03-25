import React, {useEffect, useState} from 'react';
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
import keycloak from './config/auth/keycloak.config';
import {Profile, User} from './domain/interfaces/user/User';
import {login as loginSlice, setProfiles} from './redux/user/userSlice';
import {userInformation} from './data/rest/user.service';
import {register} from './data/rest/auth/auth.service';
import {getGeneralProfiles, getProfiles} from './data/rest/profiles.service';

const App = () => {
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();
  const [kcInitialized, setKcInitialized] = useState(false);

  keycloak.onReady = async(authenticated: boolean) => {
    let profiles: Profile[] = [];
    if (!authenticated) {
      profiles = await getGeneralProfiles();
      dispatch(setProfiles(profiles));
      return;
    }
    const userProfile = await keycloak.loadUserProfile();
    const hasRole = keycloak
      .realmAccess
      .roles
      .filter(
        (role: string) => !["default-roles-portfoliodev", "offline_access", "uma_authorization"]
          .includes(role)
      )
      .length > 0;
    const user = {
      email: userProfile.email,
      givenName: userProfile.firstName,
      lastName: userProfile.lastName,
      username: userProfile.email,
      isGoogleAccount: false,
      profiles: [],
      hasRole,
    } as User;
    userInformation(user.email)
      .then(async userInfo => {
        userInfo.hasRole = hasRole;
        user.id = userInfo.id;
        dispatch(loginSlice(userInfo));
        if (user.hasRole) {
          getProfiles(user)
            .then(userProfiles => profiles = userProfiles)
            .catch(async _ => {
              profiles = await getGeneralProfiles();
              dispatch(setProfiles(profiles));
            });
        } else {
          profiles = await getGeneralProfiles();
          dispatch(setProfiles(profiles));
        }
      })
      .catch(async () => {
        dispatch(loginSlice(user))
        await register(user);
        profiles = await getGeneralProfiles();
        dispatch(setProfiles(profiles));
      });
  }

  useEffect(() => {
    const initKeycloak = () => {
      if (!kcInitialized) {
        keycloak.init({
          pkceMethod: 'S256',
          redirectUri: process.env.KEYCLOAK_INIT_REDIRECT_URL,
          onLoad: 'check-sso',
        })
          .then()
          .catch(err => console.log('init error', err));
        setKcInitialized(true);
      }
    };
    initKeycloak();
  }, [kcInitialized]);

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
