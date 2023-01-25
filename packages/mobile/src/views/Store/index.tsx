import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Header as RentalsAvailableHeader } from '../../components/rentals/Header';
import { List as YourRentalsList } from '../../components/rentals/List';
import { RENT_STATUS } from '../../shared/enum/RENT_STATUS';
import { RootState, useTypedSelector } from '../../store';
import { IMyRentals } from '../Home';
import { RentalsAvailable } from '../Home/styles';
import { Container } from './styles';

export const Store = () => {
  //* hooks
  const cars = useTypedSelector<RootState, IMyRentals>(
    (state) => state.rent.rent,
  );

  //* render
  return (
    <Container>
      <PageHeader pageTitle="Rentals available" />
      <RentalsAvailable>
        <RentalsAvailableHeader showButton={false} />
        <YourRentalsList
          data={cars.filter((car) => car.car.status === RENT_STATUS.AVAILABLE)}
        />
      </RentalsAvailable>
    </Container>
  );
};
