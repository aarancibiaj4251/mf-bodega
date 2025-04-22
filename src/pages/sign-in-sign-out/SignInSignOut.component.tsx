import React from 'react';
import HeaderComponent from '../../components/header/Header.component';
import SignIn from '../../components/sign-in/SignIn.component';
import SignOut from '../../components/sign-out/SignOut.component';
import './SignInSignOut.component.scss';

const SignInSignOutPage = () => {
  return (
    <>
      <HeaderComponent />
      <div className="sign-in-and-sign-up">
        <SignIn />
        <SignOut />
      </div>
    </>
  );
};

export default SignInSignOutPage;
