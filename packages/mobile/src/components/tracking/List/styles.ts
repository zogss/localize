import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {ICar} from '@app/shared';

export const Container = styled.SafeAreaView`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledFlatList = styled(FlatList as typeof FlatList<ICar>).attrs({
  contentContainerStyle: {
    gap: 10,
  },
})`
  width: 100%;
`;
