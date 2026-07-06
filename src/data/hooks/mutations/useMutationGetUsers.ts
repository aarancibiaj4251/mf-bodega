import {useMutation} from '@tanstack/react-query';
import {getUsersKeycloak} from '../../rest/keycloak/users.service';
import {setUsers} from '../../../redux/user/userSlice';
import {useDispatch} from 'react-redux';

export const useMutationGetUsers = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: getUsersKeycloak,
    onSuccess: (users) => dispatch(setUsers(users)),
  });
}
