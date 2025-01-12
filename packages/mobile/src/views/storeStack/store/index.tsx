import React, {useCallback, useMemo} from 'react';
import {SectionSeparator} from '@app/views/profileStack/profile/profile.styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DateTime} from 'luxon';

import car3d from '@app/assets/car_3d_view.png';
import {RENT_STATUS} from '@app/shared';
import {updateRent, useAppDispatch} from '@app/store';
import {SecondContainer} from '@app/components/rentals/ListItem/styles';
import {AppBottomTabsNavigator, StoreCarRouteProp} from '@app/navigation';

import {
  CarImage,
  CarNameTitle,
  Container,
  DateContainer,
  DateInfoContainer,
  DateInfoText,
  DateText,
  FirstContainer,
  FourthContainer,
  RentalDeliveryContainer,
  RentalDeliveryDatesContainer,
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
  RentCarButton,
  RentCarContainer,
  RentCarText,
  ScrollContainer,
} from './store.styles';

const StoreScreen: React.FC = () => {
  const {params} = useRoute<StoreCarRouteProp>();
  const {navigate} = useNavigation<AppBottomTabsNavigator>();

  const dispatch = useAppDispatch();

  const handleRentCar = useCallback(() => {
    if (params.car.status === RENT_STATUS.AVAILABLE) {
      dispatch(updateRent({car: {...params.car, status: RENT_STATUS.RENTED}}));

      setTimeout(() => {
        navigate('ProfileTab', {
          screen: 'MyRentScreen',
          params: {car: params.car},
        });
      }, 500);
    }
  }, [params]);

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
                {car.kmDrive}
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
          <RentalDeliveryDatesContainer>
            <DateContainer>
              <DateInfoContainer>
                <DateInfoText>Withdrawal</DateInfoText>
              </DateInfoContainer>
              <DateText>
                {DateTime.fromJSDate(
                  new Date(car.withdrawalDate || ''),
                ).toFormat("LLLL dd',' yyyy")}
              </DateText>
            </DateContainer>
            <DateContainer>
              <DateInfoContainer>
                <DateInfoText>Devolution</DateInfoText>
              </DateInfoContainer>
              <DateText>
                {DateTime.fromJSDate(
                  new Date(car.devolutionDate || ''),
                ).toFormat("LLLL dd',' yyyy")}
              </DateText>
            </DateContainer>
          </RentalDeliveryDatesContainer>
        </RentalDeliveryContainer>
        <SectionSeparator />
        <FourthContainer>
          <RentCarContainer>
            <RentCarButton
              disabled={car.status === RENT_STATUS.RENTED}
              onPress={() => handleRentCar()}>
              <RentCarText>
                {car.status === RENT_STATUS.AVAILABLE ? 'Rent now' : 'Rented'}
              </RentCarText>
            </RentCarButton>
          </RentCarContainer>
        </FourthContainer>
      </Container>
    </ScrollContainer>
  );
};

export default StoreScreen;
