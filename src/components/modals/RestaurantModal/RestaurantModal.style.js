import {StyleSheet, Dimensions} from 'react-native';
const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    height: deviceSize.height / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
