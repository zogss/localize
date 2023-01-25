import React from 'react';
import { Header as YourRentalsHeader } from '../../components/myRentals/Header';
import { ListItem as YourRental } from '../../components/myRentals/ListItem';
import PageHeader from '../../components/PageHeader';
import { Header as RentalsAvailableHeader } from '../../components/rentals/Header';
import { ListItem as RentalAvailable } from '../../components/rentals/ListItem';
import { ICarRental } from '../../shared/@types/ICarRental';
import { RENT_STATUS } from '../../shared/enum/RENT_STATUS';
import { RootState, useTypedSelector } from '../../store';
import {
  Container,
  ListContainer,
  RentalsContainer,
  ScrollContainer
} from './styles';

export type IMyRentals = {
  car: ICarRental;
}[];

export const Home = () => {
  //* hooks
  const cars = useTypedSelector<RootState, IMyRentals>(
    (state) => state.rent.rent,
  );

  //* render
  return (
    <ScrollContainer>
      <Container>
        <PageHeader pageTitle="Home" />
        <RentalsContainer>
          <YourRentalsHeader />
          <ListContainer>
            {cars
              .filter((car) => {
                let count = 0;

                if (car.car.status === RENT_STATUS.RENTED) {
                  count++;
                  return count <= 4 && car;
                }
              })
              .map((car) => (
                <YourRental key={car.car.id} car={car.car} />
              ))}
          </ListContainer>
        </RentalsContainer>
        <RentalsContainer
          style={{
            marginTop: 18,
          }}
        >
          <RentalsAvailableHeader />
          <ListContainer>
            {cars
              .filter((car) => {
                let count = 0;

                if (car.car.status === RENT_STATUS.AVAILABLE) {
                  count++;
                  return count <= 4 && car;
                }
              })
              .map((car) => (
                <RentalAvailable key={car.car.id} car={car.car} />
              ))}
          </ListContainer>
        </RentalsContainer>
      </Container>
    </ScrollContainer>
  );
};
