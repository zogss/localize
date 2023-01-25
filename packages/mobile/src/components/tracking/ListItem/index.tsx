import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StackTrackingNavigator } from '../../../routes/app.routes/tracking.routes';
import { ICarRental } from '../../../shared/@types/ICarRental';
import { ThemeColors } from '../../../styles/colors';
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
  TitleText
} from './styles';

interface IListItemProps {
  car: ICarRental;
}

export const ListItem: React.FC<IListItemProps> = ({ car }) => {
  //* hooks
  const navigation = useNavigation<StackTrackingNavigator>();

  //* render
  return (
    <Button onPress={() => navigation.navigate('TrackingCar', { car })}>
      <SecondContainer>
        <LeftContainer>
          <Image source={require('../../../../assets/car_3d_view.png')} />
        </LeftContainer>
        <MiddleContainer>
          <TitleText>{car.title}</TitleText>
          <DescriptionText>{car.description}</DescriptionText>
          <DateContainer>
            <DateText>{car.withdrawalDate.toLocaleDateString()}</DateText>
            <Separator />
            <DateText>{car.devolutionDate.toLocaleDateString()}</DateText>
          </DateContainer>
        </MiddleContainer>
      </SecondContainer>
      <RightContainer>
        <MaterialIcons
          name="location-pin"
          size={26}
          color={ThemeColors.cyan_500}
        />
      </RightContainer>
    </Button>
  );
};
