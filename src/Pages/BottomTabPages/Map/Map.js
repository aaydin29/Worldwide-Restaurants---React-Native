import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import styles from './Map.style';
import Loading from '../../../components/Loading/Loading';
import useFetch from '../../../hooks/useFetch';
import RestaurantModal from '../../../components/modals/RestaurantModal/RestaurantModal';
import SearchBar from '../../../components/SearchBar/SearchBar';

const Map = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const {data, loading} = useFetch();
  const mapRef = useRef();

  const renderRestaurantsMarker = () => {
    // It allows the markers to be listed on the screen.
    if (data && data.results) {
      return data.results.map(restaurant => {
        return (
          <Marker
            key={restaurant.place_id}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
            onPress={() => handleMarkerSelect(restaurant)}
          />
        );
      });
    } else {
      return null;
    }
  };

  const handleMarkerSelect = restaurant => {
    mapRef.current.animateToRegion({
      //When the marker is selected, the screen moves towards the marker.
      latitude: restaurant.geometry.location.lat,
      longitude: restaurant.geometry.location.lng,
      latitudeDelta: 5,
      longitudeDelta: 5,
    });
    setSelectedRestaurant({
      // It sends the data of the selected restaurant to the RestaurantModal.
      name: restaurant.name,
      photos: restaurant.photos,
      rating: restaurant.rating,
      formatted_address: restaurant.formatted_address,
      user_ratings_total: restaurant.user_ratings_total,
      opening_hours: restaurant.opening_hours,
      icon: restaurant.icon,
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
      <View style={styles.searchBar}>
        <SearchBar />
      </View>
      <RestaurantModal
        isVisible={modalVisible}
        onClose={handleModalVisible}
        restaurant={selectedRestaurant}
      />
    </View>
  );
};

export default Map;
