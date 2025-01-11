import React from 'react';
import { Header } from '@app/components/tracking/Header';
import { List } from '@app/components/tracking/List';
import { Container } from './tracking.styles';
import { RENT_STATUS } from '@app/shared';
import { useTypedSelector, selectRent } from '@app/store';

const TrackingsScreen: React.FC = () => {
  //* hooks
  const { rents } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <Header showButton={false} />
      <List
        data={rents.filter((rent) => rent.car!.status === RENT_STATUS.RENTED)}
      />
    </Container>
  );
};

export default TrackingsScreen;
