import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useCallback, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import PageHeader from '../../../components/PageHeader';
import { StoreCarRouteProp } from '../../../routes/app.routes';
import { ThemeColors } from '../../../styles/colors';
import {
  Container,
  HeaderContainer,
  MapContainer,
  TrackingHeaderCarText,
  TrackingHeaderContainer
} from './styles';

interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const TrackingCar = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();

  //* states
  const [currentLocation, setCurrentLocation] = useState<ILocation>();
  const [hasPermission, setHasPermission] = useState(false);

  //* handlers
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //* lifecycle
  let intervalId: NodeJS.Timer;
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await requestLocationPermission();

        if (intervalId) clearInterval(intervalId);

        const intervalFunc = async () => {
          const { coords } = await Location.getCurrentPositionAsync({});

          const location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          if (location !== currentLocation) {
            setCurrentLocation(location);
          }
        };
        
        intervalId = setInterval(intervalFunc, 4200);
        return () => clearInterval(intervalId);
      })();
    }, []),
  );

  //* render
  return (
    <Container>
      <HeaderContainer>
        <PageHeader pageTitle="See location" />
        <TrackingHeaderContainer>
          <TrackingHeaderCarText>{params.car.title}</TrackingHeaderCarText>
          <MaterialIcons
            name="location-pin"
            size={22}
            color={ThemeColors.cyan_500}
          />
        </TrackingHeaderContainer>
      </HeaderContainer>
      <MapContainer>
        <MapView
          style={{
            height: '100%',
            width: '100%',
          }}
          initialRegion={currentLocation}
          customMapStyle={mapStyle}
          provider="google"
        >
          {currentLocation &&
            currentLocation.latitude &&
            currentLocation.longitude && (
              <Marker
                draggable
                coordinate={currentLocation}
                pinColor={ThemeColors.cyan_500}
                title="I am here"
              />
            )}
        </MapView>
      </MapContainer>
    </Container>
  );
};

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];
