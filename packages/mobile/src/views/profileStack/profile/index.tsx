import { Header as YourRentalsHeader } from '@app/components/myRentals/Header';
import { List as YourRentalsList } from '@app/components/myRentals/List';
import {
  selectAuth,
  selectRent,
  useAppDispatch,
  useTypedSelector,
} from '@app/store';
import { theme } from '@app/themes';
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';
import {
  Container,
  FirstContainer,
  FullNameContainer,
  FullNameText,
  FunctionalitiesButton,
  LogOutButton,
  LogOutButtonContainer,
  LogOutButtonText,
  NameContainer,
  RentalsContainer,
  SecondContainer,
  SectionSeparator,
  ThirdContainer,
  UserInfoContainer,
  UserNameContainer,
  UserNameText,
  UserPhoto,
  UserPhotoContainer,
} from './profile.styles';

const ProfileScreen: React.FC = () => {
  //* redux hooks
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector(selectAuth);
  const { rent } = useTypedSelector(selectRent);

  //* handlers
  const handlerSignOut = async () => {
    dispatch({ type: 'logout' });
  };

  //* render
  return (
    <Container>
      <FirstContainer>
        <UserInfoContainer>
          <NameContainer>
            <FullNameContainer>
              <FullNameText>
                {user?.firstName + ' ' + user?.lastName}
              </FullNameText>
            </FullNameContainer>
            <UserNameContainer>
              <MaterialIcons
                name="verified"
                size={18}
                color={theme.colors.dark}
              />
              <UserNameText>{user?.username}</UserNameText>
            </UserNameContainer>
          </NameContainer>
          <UserPhotoContainer>
            <UserPhoto
              source={require('../../../../assets/20221231_225307.jpg')}
            />
          </UserPhotoContainer>
        </UserInfoContainer>
        <LogOutButtonContainer>
          <LogOutButton onPress={handlerSignOut}>
            <LogOutButtonText>Log out</LogOutButtonText>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="black"
              style={{
                marginLeft: 10,
              }}
            />
          </LogOutButton>
        </LogOutButtonContainer>
      </FirstContainer>
      <SectionSeparator />
      <SecondContainer>
        <FunctionalitiesButton>
          <FontAwesome name="life-buoy" size={30} color="black" />
        </FunctionalitiesButton>
        <FunctionalitiesButton>
          <Entypo name="info-with-circle" size={30} color="black" />
        </FunctionalitiesButton>
        <FunctionalitiesButton>
          <Ionicons name="settings-sharp" size={30} color="black" />
        </FunctionalitiesButton>
      </SecondContainer>
      <SectionSeparator />
      <ThirdContainer>
        <RentalsContainer>
          <YourRentalsHeader showButton={false} />
          <YourRentalsList data={rent} />
        </RentalsContainer>
      </ThirdContainer>
    </Container>
  );
};

export default ProfileScreen;
