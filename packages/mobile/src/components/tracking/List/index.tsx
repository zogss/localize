import React from 'react';

import {ICar} from '@app/shared/types/car';

import {TrackingListItem} from '../ListItem';
import {Container, StyledFlatList} from './styles';

interface ITrackingListProps {
  data: ICar[];
}

export const TrackingList: React.FC<ITrackingListProps> = ({data}) => {
  return (
    <Container>
      <StyledFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TrackingListItem key={item.id} car={item} />}
      />
    </Container>
  );
};
