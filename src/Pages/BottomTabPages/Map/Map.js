import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import styles from './Map.style';
import Loading from '../../../components/Loading/Loading';
import useFetch from '../../../hooks/useFetch';
import RestaurantModal from '../../../components/modals/RestaurantModal/RestaurantModal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const {data, loading} = useFetch();
  const mapRef = useRef();

  const renderRestaurantsMarker = () => {
    if (data && data.results) {
      return data.results.map(
        ({
          geometry,
          name,
          place_id,
          photos,
          rating,
          formatted_address,
          user_ratings_total,
          opening_hours,
          icon,
        }) => {
          return (
            <Marker
              key={place_id}
              coordinate={{
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
              }}
              title={name}
              onPress={() =>
                handleMarkerSelect({
                  geometry,
                  name,
                  place_id,
                  photos,
                  rating,
                  formatted_address,
                  user_ratings_total,
                  opening_hours,
                  icon,
                })
              }
            />
          );
        },
      );
    } else {
      return null;
    }
  };

  const handleMarkerSelect = ({
    geometry,
    name,
    photos,
    rating,
    formatted_address,
    user_ratings_total,
    opening_hours,
    icon,
  }) => {
    mapRef.current.animateToRegion({
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    });
    setSelectedRestaurant({
      name,
      photos,
      rating,
      formatted_address,
      user_ratings_total,
      opening_hours,
      icon,
    });
    setModalVisible(true);
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapView}>
        {data && renderRestaurantsMarker()}
      </MapView>
      {loading && <Loading />}
      <RestaurantModal
        isVisible={modalVisible}
        onClose={handleModalVisible}
        restaurant={selectedRestaurant}
      />
    </View>
  );
};

export default App;
