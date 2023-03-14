import React from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import Config from 'react-native-config';

const App = () => {
  const url = 'https://api.yelp.com/v3/businesses/search';
  const config = {
    headers: {
      Authorization: `Bearer ${Config.API_KEY}`,
    },
    params: {
      term: 'restaurants',
      location: 'San Francisco',
      categories: 'all',
      sort_by: 'rating',
    },
  };

  axios
    .get(url, config)
    .then(response => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response.data); // hata iletişi
    });

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} />
    </View>
  );
};

export default App;
