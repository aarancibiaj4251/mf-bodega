import React, {useEffect} from 'react';
import './App.scss';
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
import {Helpers} from './utils/helpers';
import LoaderComponent from './components/loader/Loader.component';

const App = () => {
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!keycloak.authenticated) {
      getGeneralProfiles()
        .then(profiles => dispatch(setProfiles(profiles)));
    } else {
      let profiles: Profile[] = [];
      const userProfile = keycloak.profile;
      const role = Helpers.userRoles();
      const hasRole = role.length > 0;
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
            getProfiles(role)
              .then(userProfiles => {
                dispatch(setProfiles(userProfiles));
              })
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
          register(user)
            .then()
            .catch()
            .finally(async () => {
              profiles = await getGeneralProfiles();
              dispatch(setProfiles(profiles));
            });
        });
    }
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, []);

  return (
      <>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <Navigation />
          {
              loader && (<LoaderComponent />)
          }
        <ModalLotteryNotificationComponent />
        </QueryClientProvider>
      </>
  );
}

export default App;
