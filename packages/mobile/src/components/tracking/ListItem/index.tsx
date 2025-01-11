import { TrackingStackNavigationProps } from '@app/navigation/appStack/trackingStack';
import { ICar } from '@app/shared';
import { theme } from '@app/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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

interface IListItemProps {
  car: ICar;
}

export const ListItem: React.FC<IListItemProps> = ({ car }) => {
  //* hooks
  const { push } = useNavigation<TrackingStackNavigationProps>();

  //* render
  return (
    <Button onPress={() => push('TrackScreen', { car })}>
      <SecondContainer>
        <LeftContainer>
          <Image source={require('../../../../assets/car_3d_view.png')} />
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
        <MaterialIcons
          name="location-pin"
          size={26}
          color={theme.colors.cyan_500}
        />
      </RightContainer>
    </Button>
  );
};
