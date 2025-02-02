import React from 'react';

import {RENT_STATUS} from '@app/shared';
import {ListHeader, LoadingSpinner} from '@app/components';
import {MyRentalsListItem} from '@app/components/myRentals/ListItem';
import {RentalsListItem} from '@app/components/rentals/ListItem';

import useHome from './home.hooks';
import {ListBlockContainer, ListContainer, ScrollContainer} from './styles';

const HomeScreen: React.FC = () => {
  const {isReady, userIsReady, isLoading, rents} = useHome();

  if (!isReady && !userIsReady && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollContainer>
      <ListBlockContainer>
        <ListHeader
          title="Your rentals"
          navigateTo={[
            'ProfileTab',
            {
              screen: 'MyRentalsScreen',
            },
          ]}
        />
        <ListContainer>
          {rents
            .filter(rent => rent.car.status === RENT_STATUS.RENTED)
            .map(({car}) => (
              <MyRentalsListItem key={car.id} car={car} />
            ))}
        </ListContainer>
      </ListBlockContainer>
      <ListBlockContainer>
        <ListHeader title="Rentals Available" navigateTo={['StoreTab']} />
        <ListContainer>
          {rents
            .filter(rent => rent.car.status === RENT_STATUS.AVAILABLE)
            .map(({car}) => (
              <RentalsListItem key={car.id} car={car} />
            ))}
        </ListContainer>
      </ListBlockContainer>
    </ScrollContainer>
  );
};

export default HomeScreen;
