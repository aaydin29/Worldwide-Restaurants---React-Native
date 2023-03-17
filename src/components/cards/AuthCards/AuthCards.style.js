import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputs: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: deviceSize.width / 1.4,
    height: 50,
    textAlign: 'center',
  },
  buttons: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: deviceSize.width / 1.4,
    marginTop: 30,
    backgroundColor: '#263238',
  },
  button_text: {
    textAlign: 'center',
    color: 'white',
  },
});
