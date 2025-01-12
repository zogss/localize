import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {userApi} from '@app/api';
import {selectAuth, selectRent, useTypedSelector} from '@app/store';

const useHome = () => {
  const navigation = useNavigation();

  const {isReady, user} = useTypedSelector(selectAuth);
  const {rents} = useTypedSelector(selectRent);

  const {useLazyGetMeQuery} = userApi;

  const [getMe, effects] = useLazyGetMeQuery();

  useEffect(() => {
    if (isReady && !user.id) {
      getMe();
    }
  }, [user, isReady]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (user.id) {
          return;
        }

        e.preventDefault();
      }),
    [navigation, user.id],
  );

  return {
    isReady,
    userIsReady: !!user.id,
    isLoading: effects.isLoading || effects.isFetching,
    rents,
  };
};

export default useHome;
