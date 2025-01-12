import {AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {
  selectAuth,
  selectRent,
  useAppDispatch,
  useTypedSelector,
} from '@app/store';
import {ProfileStackNavigatonProps} from '@app/navigation/appStack/profileStack';

export const menuOptions = [
  {
    title: 'My Rentals',
    subtitle: 'Review and edit your rentals',
    Icon: FontAwesome5,
    iconTag: 'shopping-bag',
    route: 'MyRentalsScreen',
  },
  {
    title: 'My Personal Data',
    subtitle: 'Review and edit your personal data',
    Icon: AntDesign,
    iconTag: 'idcard',
    route: null,
  },
  {
    title: 'My Favorites',
    subtitle: 'Review and edit your favorites',
    Icon: AntDesign,
    iconTag: 'heart',
    route: null,
  },
  {
    title: 'My Reviews',
    subtitle: 'Review and edit your reviews',
    Icon: AntDesign,
    iconTag: 'star',
    route: null,
  },
  {
    title: 'My Settings',
    subtitle: 'Review and edit your settings',
    Icon: Ionicons,
    iconTag: 'settings-sharp',
    route: null,
  },
];

const useProfile = () => {
  const {navigate} = useNavigation<ProfileStackNavigatonProps>();

  const dispatch = useAppDispatch();
  const {user} = useTypedSelector(selectAuth);
  const {rents} = useTypedSelector(selectRent);

  const handleSignOut = async () => {
    dispatch({type: 'logout'});
  };

  return {
    user,
    rents,
    menuOptions,
    navigate,
    handleSignOut,
  };
};

export default useProfile;
