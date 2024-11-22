import { ICar } from '@app/shared';
import React from 'react';
import { ListItem } from '../ListItem';
import { Container, List as FlatList } from './styles';

interface IListProps {
  data: {
    car: ICar;
  }[];
}

interface IListItemProps {
  car: ICar;
}

export const List: React.FC<IListProps> = ({ data }) => {
  //* render
  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item: IListItemProps) => item.car.id}
        renderItem={({ item }: { item: IListItemProps }) => (
          <ListItem key={item.car.id} car={item.car} />
        )}
      />
    </Container>
  );
};
