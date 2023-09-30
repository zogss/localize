import { selectRent, useTypedSelector } from '@app/store';
import React from 'react';
import { Header as YourRentalsHeader } from '../../components/myRentals/Header';
import { ListItem as YourRental } from '../../components/myRentals/ListItem';
import { Header as RentalsAvailableHeader } from '../../components/rentals/Header';
import { ListItem as RentalAvailable } from '../../components/rentals/ListItem';
import { RENT_STATUS } from '../../shared/enum/RENT_STATUS';
import { ICarRental } from '../../shared/types/ICarRental';
import {
  Container,
  ListContainer,
  RentalsContainer,
  ScrollContainer,
} from './styles';

export type IMyRentals = {
  car: ICarRental;
}[];

const HomeScreen: React.FC = () => {
  //* hooks
  const { rent } = useTypedSelector(selectRent);

  //* render
  return (
    <ScrollContainer>
      <Container>
        <RentalsContainer>
          <YourRentalsHeader />
          <ListContainer>
            {rent
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
            {rent
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

export default HomeScreen;
