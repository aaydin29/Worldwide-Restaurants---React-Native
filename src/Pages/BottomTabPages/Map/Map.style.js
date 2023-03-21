import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchBar: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 10,
  },
});
