import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StackAppNavigator } from '../../../routes/app.routes';
import { Button, ButtonText, Container, TitleText } from './styles';

interface IHeaderProps {
  showButton?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ showButton }) => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* render
  return (
    <Container>
      <TitleText>Rentals available</TitleText>
      {showButton !== undefined && showButton === false ? (
        <></>
      ) : (
        <Button onPress={() => navigation.navigate('StoreTab')}>
          <ButtonText>See all</ButtonText>
        </Button>
      )}
    </Container>
  );
};
