import React from 'react';
import { Header } from '@app/components/rentals/Header';
import { List } from '@app/components/rentals/List';
import { RENT_STATUS } from '@app/shared/enum/RENT_STATUS';
import { selectRent, useTypedSelector } from '@app/store';
import { Container } from './stores.styles';

const StoresScreen: React.FC = () => {
  //* hooks
  const { rents } = useTypedSelector(selectRent);

  //* render
  return (
    <Container>
      <Header showButton={false} />
      <List
        data={rents.filter(
          (rent) => rent.car!.status === RENT_STATUS.AVAILABLE,
        )}
      />
    </Container>
  );
};

export default StoresScreen;
