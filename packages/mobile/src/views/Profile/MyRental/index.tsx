import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import PageHeader from '../../../components/PageHeader';
import { StoreCarRouteProp } from '../../../routes/app.routes';
import { StackTrackingNavigator } from '../../../routes/app.routes/tracking.routes';
import { ThemeColors } from '../../../styles/colors';
import {
  FirstContainer,
  SecondContainer,
  SectionSeparator
} from '../styles';
import {
  CarImage, Container, DateContainer,
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
  ScrollContainer
} from './styles';

export const MyRental = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();
  const navigation = useNavigation<StackTrackingNavigator>();

  //* render
  return (
    <ScrollContainer>
      <Container>
        <FirstContainer>
          <PageHeader pageTitle="My rental" />
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
              {params.car.withdrawalDate.toLocaleDateString()}
            </DateText>
          </DateContainer>
          <DateContainer>
            <DateInfoContainer>
              <DateInfoText>Return date</DateInfoText>
            </DateInfoContainer>
            <DateText>
              {params.car.devolutionDate.toLocaleDateString()}
            </DateText>
          </DateContainer>
        </RentalDeliveryContainer>
        <SectionSeparator />
        <FourthContainer>
          <LocationRedirectionContainer>
            <LocationRedirectionText>See location</LocationRedirectionText>
            <LocationRedirectionButton
              onPress={() =>
                navigation.navigate('TrackingCar', { car: params.car })
              }
            >
              <MaterialIcons
                name="location-pin"
                size={34}
                color={ThemeColors.cyan_500}
              />
            </LocationRedirectionButton>
          </LocationRedirectionContainer>
        </FourthContainer>
      </Container>
    </ScrollContainer>
  );
};
