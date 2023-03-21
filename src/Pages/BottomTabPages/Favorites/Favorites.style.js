import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header_container: {
    backgroundColor: '#263238',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  header_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  login_icon: {
    marginRight: 15,
  },
  no_favorites: {
    margin: 10,
    marginTop: 300,
    textAlign: 'center',
    fontSize: 15,
  },
});
