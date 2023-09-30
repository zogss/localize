import {
  DateContainer,
  DateText,
  SecondContainer,
} from '@app/components/myRentals/ListItem/styles';
import { StackAppNavigator, StoreCarRouteProp } from '@app/navigation';
import { updateRent, useAppDispatch } from '@app/store';
import {
  CarImage,
  DateInfoContainer,
  DateInfoText,
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
  RentalHeaderTitleText,
} from '@app/views/profileStack/myRentals/myRentals.styles';
import {
  FirstContainer,
  SectionSeparator,
} from '@app/views/profileStack/profile/profile.styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { RENT_STATUS } from '../../../shared/enum/RENT_STATUS';
import { Container } from '../stores/stores.styles';
import {
  RentCarButton,
  RentCarContainer,
  RentCarText,
  ScrollContainer,
} from './store.styles';

const StoreScreen: React.FC = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();
  const { navigate } = useNavigation<StackAppNavigator>();

  //* redux hooks
  const dispatch = useAppDispatch();

  //* handlers
  const handleRentCar = useCallback(() => {
    if (params.car.status === RENT_STATUS.AVAILABLE) {
      dispatch(
        updateRent({ car: { ...params.car, status: RENT_STATUS.RENTED } }),
      );

      navigate('ProfileTab', {
        screen: 'MyRentalsScreen',
        params: { car: params.car },
      });
    }
  }, [params]);

  //*render
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

export default StoreScreen;
