import React, {useMemo} from 'react';
import {theme} from '@app/themes';
import {FirstContainer} from '@app/views/storeStack/store/store.styles';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

import car3d from '@app/assets/car_3d_view.png';
import {SecondContainer} from '@app/components/rentals/ListItem/styles';
import {AppBottomTabsNavigator, StoreCarRouteProp} from '@app/navigation';

import {SectionSeparator} from '../profile/profile.styles';
import {
  CarImage,
  CarNameTitle,
  Container,
  DateContainer,
  DateInfoContainer,
  DateInfoText,
  DateText,
  FourthContainer,
  LocationRedirectionButton,
  LocationRedirectionContainer,
  LocationRedirectionText,
  RentalDeliveryContainer,
  RentalDeliveryTitleText,
  RentalDescriptionContainer,
  RentalDescriptionText,
  RentalDescriptionTitleText,
  RentalHeaderAdditionalInfoContainer,
  RentalHeaderAdditionalInfoText,
  RentalHeaderContainer,
  RentalHeaderSeparator,
  RentalHeaderSubtitleContainer,
  RentalHeaderSubtitleText,
  ScrollContainer,
} from './myRentals.styles';

const MyRentScreen: React.FC = () => {
  const {params} = useRoute<StoreCarRouteProp>();
  const {navigate} = useNavigation<AppBottomTabsNavigator>();

  const car = useMemo(() => params.car, [params]);

  return (
    <ScrollContainer>
      <Container>
        <FirstContainer>
          <CarNameTitle>{car.title}</CarNameTitle>
          <CarImage source={car3d} />
          <RentalHeaderContainer>
            <RentalHeaderSubtitleContainer>
              <RentalHeaderSubtitleText>{car.price}</RentalHeaderSubtitleText>
            </RentalHeaderSubtitleContainer>
            <RentalHeaderAdditionalInfoContainer>
              <RentalHeaderAdditionalInfoText>
                {car.year}
              </RentalHeaderAdditionalInfoText>
              <RentalHeaderSeparator />
              <RentalHeaderAdditionalInfoText>
                {car.kmDrive} km
              </RentalHeaderAdditionalInfoText>
            </RentalHeaderAdditionalInfoContainer>
          </RentalHeaderContainer>
        </FirstContainer>
        <SectionSeparator />
        <SecondContainer>
          <RentalDescriptionContainer>
            <RentalDescriptionTitleText>Description</RentalDescriptionTitleText>
            <RentalDescriptionText>{car.description}</RentalDescriptionText>
          </RentalDescriptionContainer>
        </SecondContainer>
        <SectionSeparator />
        <RentalDeliveryContainer>
          <RentalDeliveryTitleText>Delivery summary</RentalDeliveryTitleText>
          <DateContainer>
            <DateInfoContainer>
              <DateInfoText>Withdrawal date</DateInfoText>
            </DateInfoContainer>
            <DateText>
              {new Date(car.withdrawalDate || '').toLocaleDateString()}
            </DateText>
          </DateContainer>
          <DateContainer>
            <DateInfoContainer>
              <DateInfoText>Return date</DateInfoText>
            </DateInfoContainer>
            <DateText>
              {new Date(car.devolutionDate || '').toLocaleDateString()}
            </DateText>
          </DateContainer>
        </RentalDeliveryContainer>
        <SectionSeparator />
        <FourthContainer>
          <LocationRedirectionContainer>
            <LocationRedirectionText>See location</LocationRedirectionText>
            <LocationRedirectionButton
              onPress={() => navigate('TrackScreen', {car})}>
              <MaterialIcons
                name="location-pin"
                size={34}
                color={theme.colors.cyan_500}
              />
            </LocationRedirectionButton>
          </LocationRedirectionContainer>
        </FourthContainer>
      </Container>
    </ScrollContainer>
  );
};

export default MyRentScreen;
