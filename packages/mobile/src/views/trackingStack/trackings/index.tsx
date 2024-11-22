import React from 'react';
import { Header as TrackingAvailableHeader } from '../../../components/tracking/Header';
import { List as TrackingAvailableList } from '../../../components/tracking/List';
import { Container } from './tracking.styles';
import { RENT_STATUS } from '@app/shared';
import { useTypedSelector, selectRent } from '@app/store';

const TrackingsScreen: React.FC = () => {
  //* hooks
  const { rents } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <>
        <TrackingAvailableHeader showButton={false} />
        <TrackingAvailableList
          data={rents.filter((rent) => rent.car!.status === RENT_STATUS.RENTED)}
        />
      </>
    </Container>
  );
};

export default TrackingsScreen;
