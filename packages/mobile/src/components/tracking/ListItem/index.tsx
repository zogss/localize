import React from 'react';
import {theme} from '@app/themes';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {ICar} from '@app/shared';
import {TrackingStackNavigationProps} from '@app/navigation/appStack/trackingStack';

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
import car3d from '@app/assets/car_3d_view.png';

interface ITrackingListItemProps {
  car: ICar;
}

export const TrackingListItem: React.FC<ITrackingListItemProps> = ({car}) => {
  const {push} = useNavigation<TrackingStackNavigationProps>();

  return (
    <Button onPress={() => push('TrackScreen', {car})}>
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
        <MaterialIcons
          name="location-pin"
          size={26}
          color={theme.colors.cyan_500}
        />
      </RightContainer>
    </Button>
  );
};
