import { NavigationProp } from '@app/navigation';
import { ICar } from '@app/shared';
import { theme } from '@app/themes';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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
  TitleText,
} from './styles';

interface IListItemProps {
  car: ICar;
}

export const ListItem: React.FC<IListItemProps> = ({ car }) => {
  //* hooks
  const { navigate } = useNavigation<NavigationProp>();

  //* render
  return (
    <Button
      onPress={() =>
        navigate('AppStack', {
          screen: 'StoreTab',
          params: { screen: 'StoreScreen', params: { car } },
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
            <DateText>
              {new Date(car.withdrawalDate).toLocaleDateString()}
            </DateText>
            <Separator />
            <DateText>
              {new Date(car.devolutionDate).toLocaleDateString()}
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
