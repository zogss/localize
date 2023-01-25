import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Header as TrackingAvailableHeader } from '../../components/tracking/Header';
import { List as TrackingAvailableList } from '../../components/tracking/List';
import { RENT_STATUS } from '../../shared/enum/RENT_STATUS';
import { RootState, useTypedSelector } from '../../store';
import { IMyRentals } from '../Home';
import { RentalsContainer } from '../Home/styles';
import { Container } from './styles';

export const Tracking = () => {
  //* hooks
  const cars = useTypedSelector<RootState, IMyRentals>(
    (state) => state.rent.rent,
  );

  //* render
  return (
    <Container>
      <PageHeader pageTitle="See location" />
      <RentalsContainer>
        <TrackingAvailableHeader showButton={false} />
        <TrackingAvailableList
          data={cars.filter((car) => car.car.status === RENT_STATUS.RENTED)}
        />
      </RentalsContainer>
    </Container>
  );
};
