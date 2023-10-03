import React from 'react';
import { Container } from './tracking.styles';

const TrackingsScreen: React.FC = () => {
  //* hooks
  // const { rent } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      {/* <RentalsContainer>
        <TrackingAvailableHeader showButton={false} />
        <TrackingAvailableList
          data={rent.filter((car) => car.car.status === RENT_STATUS.RENTED)}
        />
      </RentalsContainer> */}
    </Container>
  );
};

export default TrackingsScreen;
