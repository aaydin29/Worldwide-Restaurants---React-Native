import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

import Loading from '../../../components/Loading/Loading';
import useFetch from '../../../hooks/useFetch';

const App = () => {
  const {data, loading} = useFetch();
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  console.log(data);

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} />
      {loading && <Loading />}
    </View>
  );
};

export default App;
