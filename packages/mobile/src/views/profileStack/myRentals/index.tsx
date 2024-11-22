import { StoreCarRouteProp } from '@app/navigation';
import { TrackingStackNavigationProps } from '@app/navigation/appStack/trackingStack';
import { theme } from '@app/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SectionSeparator } from '../profile/profile.styles';
import {
  CarImage,
  Container,
  DateContainer,
  DateInfoContainer,
  DateInfoText,
  DateText,
  FourthContainer,
  LocationRedirectionButton,
  LocationRedirectionContainer,
  LocationRedirectionText,
  PageSubtitleText,
  RentalContainer,
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
  RentalHeaderTitleText,
  ScrollContainer,
} from './myRentals.styles';
import { FirstContainer } from '@app/views/storeStack/store/store.styles';
import { SecondContainer } from '@app/components/rentals/ListItem/styles';

const MyRentalsScreen: React.FC = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();
  const { navigate } = useNavigation<TrackingStackNavigationProps>();

  //* render
  return (
    <ScrollContainer>
      <Container>
        <FirstContainer>
          <RentalContainer>
            <PageSubtitleText>{params.car.title}</PageSubtitleText>
            <CarImage source={require('../../../../assets/car_3d_view.png')} />
            <RentalHeaderContainer>
              <RentalHeaderTitleText>{params.car.title}</RentalHeaderTitleText>
              <RentalHeaderSubtitleContainer>
                <RentalHeaderSubtitleText>
                  {params.car.price}
                </RentalHeaderSubtitleText>
              </RentalHeaderSubtitleContainer>
              <RentalHeaderAdditionalInfoContainer>
                <RentalHeaderAdditionalInfoText>
                  {params.car.year}
                </RentalHeaderAdditionalInfoText>
                <RentalHeaderSeparator />
                <RentalHeaderAdditionalInfoText>
                  {params.car.kmDrive}
                </RentalHeaderAdditionalInfoText>
              </RentalHeaderAdditionalInfoContainer>
            </RentalHeaderContainer>
          </RentalContainer>
        </FirstContainer>
        <SectionSeparator />
        <SecondContainer>
          <RentalDescriptionContainer>
            <RentalDescriptionTitleText>Description</RentalDescriptionTitleText>
            <RentalDescriptionText>
              {params.car.description}
            </RentalDescriptionText>
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
              {new Date(params.car.withdrawalDate || '').toLocaleDateString()}
            </DateText>
          </DateContainer>
          <DateContainer>
            <DateInfoContainer>
              <DateInfoText>Return date</DateInfoText>
            </DateInfoContainer>
            <DateText>
              {new Date(params.car.devolutionDate || '').toLocaleDateString()}
            </DateText>
          </DateContainer>
        </RentalDeliveryContainer>
        <SectionSeparator />
        <FourthContainer>
          <LocationRedirectionContainer>
            <LocationRedirectionText>See location</LocationRedirectionText>
            <LocationRedirectionButton
              onPress={() => navigate('TrackScreen', { car: params.car })}
            >
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

export default MyRentalsScreen;
