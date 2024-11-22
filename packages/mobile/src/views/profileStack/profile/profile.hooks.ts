import { ProfileStackNavigatonProps } from '@app/navigation/appStack/profileStack';
import {
  selectAuth,
  selectRent,
  useAppDispatch,
  useTypedSelector,
} from '@app/store';
import { useNavigation } from '@react-navigation/native';
import { menuOptions } from './profile.service';

const useProfile = () => {
  //* hooks
  const { navigate } = useNavigation<ProfileStackNavigatonProps>();

  //* redux hooks
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector(selectAuth);
  const { rents } = useTypedSelector(selectRent);

  //* handlers
  const handleSignOut = async () => {
    dispatch({ type: 'logout' });
  };

  //* return
  return {
    user,
    rents,
    menuOptions,
    navigate,
    handleSignOut,
  };
};

export default useProfile;
