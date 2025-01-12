import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Button, ButtonText, Container, TitleText} from './styles';

interface IListHeaderProps {
  title: string;
  hideButton?: boolean;
  navigateTo?: [screen: string] | [screen: string, params: any];
}
const ListHeader: React.FC<IListHeaderProps> = ({
  title,
  hideButton,
  navigateTo,
}) => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container>
      <TitleText>{title}</TitleText>
      {hideButton ? null : (
        <Button
          onPress={
            hideButton || !navigateTo
              ? undefined
              : () => navigate(...navigateTo)
          }>
          <ButtonText>See all</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default ListHeader;
