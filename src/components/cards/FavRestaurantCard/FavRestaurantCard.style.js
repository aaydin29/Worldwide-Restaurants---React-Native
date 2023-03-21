import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 10,
  },
  name_rating_container: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#263238',
  },
  rating_container: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 10,
    color: '#263238',
  },
  restaurant_icon: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  button_text: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 14,
    alignSelf: 'center',
  },
  remove_icon: {
    marginRight: 5,
    marginLeft: 10,
  },
  more_info_container: {
    marginTop: 10,
    marginHorizontal: 3,
  },
  openHour_icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  status_circle: {
    height: 14,
    borderWidth: 1,
    borderRadius: 7,
    padding: 4,
    marginRight: 7,
    marginLeft: 10,
  },
  status_circle_green: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  status_circle_orange: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  address: {
    fontWeight: '700',
  },
});
