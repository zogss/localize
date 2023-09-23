import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import PageHeader from '../../../components/PageHeader';
import {
  StackAppNavigator,
  StoreCarRouteProp
} from '../../../routes/app.routes';
import { RENT_STATUS } from '../../../shared/enum/RENT_STATUS';
import { useTypedDispatch } from '../../../store';
import { updateRent } from '../../../store/modules/rent';
import {
  CarImage,
  DateContainer,
  DateInfoContainer,
  DateInfoText,
  DateText,
  FourthContainer,
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
  RentalHeaderTitleText
} from '../../Profile/MyRental/styles';
import {
  Container,
  FirstContainer,
  SecondContainer,
  SectionSeparator
} from '../../Profile/styles';
import {
  RentCarButton,
  RentCarContainer,
  RentCarText,
  ScrollContainer
} from './styles';

export const StoreCar = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();
  const navigation = useNavigation<StackAppNavigator>();

  //* redux hooks
  const dispatch = useTypedDispatch();

  //* handlers
  const handleRentCar = useCallback(() => {
    if (params.car.status === RENT_STATUS.AVAILABLE) {
      dispatch(
        updateRent({ car: { ...params.car, status: RENT_STATUS.RENTED } }),
      );
      navigation.navigate('ProfileTab', {
        screen: 'MyRental',
        params: { car: params.car },
      });
    }
  }, [params]);

  //*render
  return (
    <ScrollContainer>
      <Container>
        <FirstContainer>
          <PageHeader pageTitle="Rentals available" />
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
              {new Date(params.car.withdrawalDate).toLocaleDateString()}
            </DateText>
          </DateContainer>
          <DateContainer>
            <DateInfoContainer>
              <DateInfoText>Return date</DateInfoText>
            </DateInfoContainer>
            <DateText>
              {new Date(params.car.devolutionDate).toLocaleDateString()}
            </DateText>
          </DateContainer>
        </RentalDeliveryContainer>
        <SectionSeparator />
        <FourthContainer>
          <RentCarContainer>
            <RentCarButton
              disabled={params.car.status === RENT_STATUS.RENTED}
              onPress={() => handleRentCar()}
            >
              <RentCarText>
                {params.car.status === RENT_STATUS.AVAILABLE
                  ? 'Rent now'
                  : 'Rented'}
              </RentCarText>
            </RentCarButton>
          </RentCarContainer>
        </FourthContainer>
      </Container>
    </ScrollContainer>
  );
};
