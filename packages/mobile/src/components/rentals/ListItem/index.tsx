import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StackAppNavigator } from '../../../routes/app.routes';
import { ICarRental } from '../../../shared/@types/ICarRental';
import { ThemeColors } from '../../../styles/colors';
import {
  Button,
  DateContainer,
  DateText,
  Image,
  LeftContainer,
  MiddleContainer,
  PriceText,
  RightContainer,
  SecondContainer,
  Separator,
  TitleText
} from './styles';

interface IListItemProps {
  car: ICarRental;
}

export const ListItem: React.FC<IListItemProps> = ({ car }) => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* render
  return (
    <Button
      onPress={() =>
        navigation.navigate('StoreTab', {
          screen: 'StoreCar',
          params: { car: car },
        })
      }
    >
      <SecondContainer>
        <LeftContainer>
          <Image source={require('../../../../assets/car_3d_view.png')} />
        </LeftContainer>
        <MiddleContainer>
          <TitleText>{car.title}</TitleText>
          <PriceText>{car.price}</PriceText>
          <DateContainer>
            <DateText>{car.withdrawalDate.toLocaleDateString()}</DateText>
            <Separator />
            <DateText>{car.devolutionDate.toLocaleDateString()}</DateText>
          </DateContainer>
        </MiddleContainer>
      </SecondContainer>
      <RightContainer>
        <FontAwesome
          name="chevron-right"
          size={20}
          color={ThemeColors.gray_400}
        />
      </RightContainer>
    </Button>
  );
};
