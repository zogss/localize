import React from 'react';
import {theme} from '@app/themes';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import car3d from '@app/assets/car_3d_view.png';
import {ICar} from '@app/shared';
import {StackAppNavigator} from '@app/navigation';

import {
  Button,
  DateContainer,
  DateText,
  DescriptionText,
  Image,
  LeftContainer,
  MiddleContainer,
  RightContainer,
  SecondContainer,
  Separator,
  TitleText,
} from './styles';

interface IMyRentalsListItemProps {
  car: ICar;
}

export const MyRentalsListItem: React.FC<IMyRentalsListItemProps> = ({car}) => {
  const {navigate} = useNavigation<StackAppNavigator>();

  return (
    <Button
      onPress={() =>
        navigate('ProfileTab', {
          screen: 'MyRentScreen',
          params: {car},
        })
      }>
      <SecondContainer>
        <LeftContainer>
          <Image source={car3d} />
        </LeftContainer>
        <MiddleContainer>
          <TitleText>{car.title}</TitleText>
          <DescriptionText>{car.description}</DescriptionText>
          <DateContainer>
            <DateText>
              {new Date(car.withdrawalDate || '').toLocaleDateString()}
            </DateText>
            <Separator />
            <DateText>
              {new Date(car.devolutionDate || '').toLocaleDateString()}
            </DateText>
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
