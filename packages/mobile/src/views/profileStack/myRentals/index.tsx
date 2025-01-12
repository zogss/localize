import React from 'react';

import {RENT_STATUS} from '@app/shared';
import {selectRent, useTypedSelector} from '@app/store';
import {ListHeader} from '@app/components';
import {MyRentalsList} from '@app/components/myRentals/List';

import {Container} from './myRentals.styles';

const MyRentalsScreen: React.FC = () => {
  const {rents} = useTypedSelector(selectRent);

  return (
    <Container>
      <ListHeader title="My Rentals" hideButton />
      <MyRentalsList
        data={rents
          .filter(rent => rent.car.status === RENT_STATUS.RENTED)
          .map(rent => rent.car)}
      />
    </Container>
  );
};

export default MyRentalsScreen;
