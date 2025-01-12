import React from 'react';
import {theme} from '@app/themes';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import car3d from '@app/assets/car_3d_view.png';
import {ICar} from '@app/shared';
import {NavigationProp, AppBottomTabsNavigator} from '@app/navigation';

import {
  Button,
  DateContainer,
  OtherFeaturesText,
  Image,
  LeftContainer,
  MiddleContainer,
  PriceText,
  RightContainer,
  SecondContainer,
  Separator,
  TitleText,
} from './styles';

interface IRentalsListItemProps {
  car: ICar;
}

export const RentalsListItem: React.FC<IRentalsListItemProps> = ({car}) => {
  const {navigate} = useNavigation<AppBottomTabsNavigator>();

  return (
    <Button
      onPress={() =>
        navigate('StoreTab', {
          screen: 'StoreScreen',
          params: {car},
        })
      }>
      <SecondContainer>
        <LeftContainer>
          <Image source={car3d} />
        </LeftContainer>
        <MiddleContainer>
          <TitleText>{car.title}</TitleText>
          <PriceText>{car.price}</PriceText>
          <DateContainer>
            <OtherFeaturesText>{car.year}</OtherFeaturesText>
            <Separator />
            <OtherFeaturesText>{car.kmDrive} km</OtherFeaturesText>
          </DateContainer>
        </MiddleContainer>
      </SecondContainer>
      <RightContainer>
        <FontAwesome
          name="chevron-right"
          size={20}
          color={theme.colors.gray_400}
        />
      </RightContainer>
    </Button>
  );
};
