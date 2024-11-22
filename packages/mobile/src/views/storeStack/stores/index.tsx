import React from 'react';
import { Header as RentalsAvailableHeader } from '../../../components/rentals/Header';
import { List as YourRentalsList } from '../../../components/rentals/List';
import { RENT_STATUS } from '../../../shared/enum/RENT_STATUS';
import { selectRent, useTypedSelector } from '../../../store';
// import { RentalsAvailable } from '../../home/styles';
import { Container } from './stores.styles';

const StoresScreen: React.FC = () => {
  //* hooks
  const { rents } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <>
        <RentalsAvailableHeader showButton={false} />
        <YourRentalsList
          data={rents.filter(
            (rent) => rent.car!.status === RENT_STATUS.AVAILABLE,
          )}
        />
      </>
    </Container>
  );
};

export default StoresScreen;
