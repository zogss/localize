import React, {useMemo} from 'react';
import {Entypo} from '@expo/vector-icons';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

import {Container, GoBackBtn, StyledSafeAreaView, TitleText} from './styles';

const ScreenHeader: React.FC<NativeStackHeaderProps> = ({
  navigation: {navigate, goBack},
  options: {title},
  route,
}) => {
  const handleNavigate = () => {
    switch (route.name) {
      case 'HomeScreen':
        return goBack();
      case 'StoresScreen':
        return goBack();
      case 'StoreScreen':
        return navigate('StoresScreen');
      case 'ProfileScreen':
        return goBack();
      case 'MyRentalsScreen':
        return navigate('ProfileScreen');
      case 'MyRentScreen':
        return navigate('MyRentalsScreen');
      case 'TrackingsScreen':
        return goBack();
      case 'TrackScreen':
        return navigate('TrackingsScreen');
      default:
        return goBack();
    }
  };

  const canGoBack = useMemo(() => {
    switch (route.name) {
      case 'HomeScreen':
        return false;
      case 'StoresScreen':
        return false;
      case 'ProfileScreen':
        return false;
      case 'TrackingsScreen':
        return false;
      default:
        return true;
    }
  }, [route.name]);

  return (
    <StyledSafeAreaView edges={['top']}>
      <Container>
        {canGoBack && (
          <GoBackBtn onPress={handleNavigate}>
            <Entypo name="chevron-left" size={34} color="white" />
          </GoBackBtn>
        )}
        <TitleText>{title}</TitleText>
      </Container>
    </StyledSafeAreaView>
  );
};

export default ScreenHeader;
