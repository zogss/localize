import React from 'react';
import { Header as TrackingAvailableHeader } from '../../../components/tracking/Header';
import { List as TrackingAvailableList } from '../../../components/tracking/List';
import { RENT_STATUS } from '../../../shared/enum/RENT_STATUS';
import { selectRent, useTypedSelector } from '../../../store';
import { RentalsContainer } from '../../home/styles';
import { Container } from './tracking.styles';

const TrackingsScreen: React.FC = () => {
  //* hooks
  const { rent } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <RentalsContainer>
        <TrackingAvailableHeader showButton={false} />
        <TrackingAvailableList
          data={rent.filter((car) => car.car.status === RENT_STATUS.RENTED)}
        />
      </RentalsContainer>
    </Container>
  );
};

export default TrackingsScreen;
