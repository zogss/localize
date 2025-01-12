import React from 'react';

import {ICar} from '@app/shared/types/car';

import {RentalsListItem} from '../ListItem';
import {Container, StyledFlatList} from './styles';

interface IRentalsListProps {
  data: ICar[];
}

export const RentalsList: React.FC<IRentalsListProps> = ({data}) => {
  return (
    <Container>
      <StyledFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RentalsListItem key={item.id} car={item} />}
      />
    </Container>
  );
};
