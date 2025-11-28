import { useLocation, Navigate } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { User } from '../../domain/interfaces/user/User';

const RequireAuth = ({ children, currentUser}: { children: JSX.Element, currentUser: User }) => {

  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(RequireAuth);
