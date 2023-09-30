import { StackAppNavigator } from '@app/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, ButtonText, Container, TitleText } from './styles';

interface IHeaderProps {
  showButton?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ showButton }) => {
  //* hooks
  const { navigate } = useNavigation<StackAppNavigator>();

  //* render
  return (
    <Container>
      <TitleText>Your rentals</TitleText>
      {showButton !== undefined && showButton === false ? null : (
        <Button onPress={() => navigate('ProfileTab')}>
          <ButtonText>See all</ButtonText>
        </Button>
      )}
    </Container>
  );
};
