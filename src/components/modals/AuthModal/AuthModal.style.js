import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    height: deviceSize.height / 2,
  },
  tabs_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  tab_buttons: {
    padding: 10,
    borderBottomWidth: 0,
  },
  active_tab_buttons: {
    borderBottomWidth: 2.5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabs_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
});
