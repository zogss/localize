import React from 'react';

import {ICar} from '@app/shared';

import {MyRentalsListItem} from '../ListItem';
import {Container, StyledFlatList} from './styles';

interface IMyRentalsListProps {
  data: ICar[];
}

export const MyRentalsList: React.FC<IMyRentalsListProps> = ({data}) => {
  return (
    <Container>
      <StyledFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MyRentalsListItem key={item.id} car={item} />}
      />
    </Container>
  );
};
