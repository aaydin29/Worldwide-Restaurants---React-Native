import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import Loading from '../../../components/Loading/Loading';
import useFetch from '../../../hooks/useFetch';

const App = () => {
  const {data, loading} = useFetch();

  const renderRestaurantsMarker = () => {
    if (data && data.results) {
      return data.results.map(({geometry, name, place_id}) => {
        return (
          <Marker
            key={place_id}
            coordinate={{
              latitude: geometry.location.lat,
              longitude: geometry.location.lng,
            }}
            title={name}
          />
        );
      });
    } else {
      return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}}>{data && renderRestaurantsMarker()}</MapView>
      {loading && <Loading />}
    </View>
  );
};

export default App;
