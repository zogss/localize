import React from 'react';

import {RENT_STATUS} from '@app/shared/enum/RENT_STATUS';
import {selectRent, useTypedSelector} from '@app/store';
import {ListHeader} from '@app/components';
import {RentalsList} from '@app/components/rentals/List';

import {Container} from './stores.styles';

const StoresScreen: React.FC = () => {
  const {rents} = useTypedSelector(selectRent);

  return (
    <Container>
      <ListHeader title="Rentals Available" hideButton />
      <RentalsList
        data={rents
          .filter(rent => rent.car.status === RENT_STATUS.AVAILABLE)
          .map(rent => rent.car)}
      />
    </Container>
  );
};

export default StoresScreen;
