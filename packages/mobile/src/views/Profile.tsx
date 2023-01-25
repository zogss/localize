import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { StackAppNavigator } from '../routes/app.routes';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 20px;
  color: blue;
  font-weight: bold;
`;

export const Profile = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* render
  return (
    <Container>
      <Text>Welcome to the Profile screen!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </Container>
  );
};
