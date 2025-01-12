import React from 'react';

import {RENT_STATUS} from '@app/shared';
import {selectRent, useTypedSelector} from '@app/store';
import {ListHeader} from '@app/components';
import {TrackingList} from '@app/components/tracking/List';

import {Container} from './tracking.styles';

const TrackingsScreen: React.FC = () => {
  const {rents} = useTypedSelector(selectRent);

  return (
    <Container>
      <ListHeader title="Trackings Available" hideButton />
      <TrackingList
        data={rents
          .filter(rent => rent.car.status === RENT_STATUS.RENTED)
          .map(rent => rent.car)}
      />
    </Container>
  );
};

export default TrackingsScreen;
