import React from 'react';
import { Header as RentalsAvailableHeader } from '../../../components/rentals/Header';
import { List as YourRentalsList } from '../../../components/rentals/List';
import { RENT_STATUS } from '../../../shared/enum/RENT_STATUS';
import { selectRent, useTypedSelector } from '../../../store';
import { RentalsAvailable } from '../../home/styles';
import { Container } from './stores.styles';

const StoresScreen: React.FC = () => {
  //* hooks
  const { rent } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <RentalsAvailable>
        <RentalsAvailableHeader showButton={false} />
        <YourRentalsList
          data={rent.filter((car) => car.car.status === RENT_STATUS.AVAILABLE)}
        />
      </RentalsAvailable>
    </Container>
  );
};

export default StoresScreen;
