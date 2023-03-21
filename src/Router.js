import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlashMessage from 'react-native-flash-message';

import Map from './Pages/BottomTabPages/Map/Map';
import Favorites from './Pages/BottomTabPages/Favorites/Favorites';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabPages() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name="Map" component={Map} options={mapOptions} />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={favoritesOptions}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTabPages" component={BottomTabPages} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const tabBarOptions = () => ({
  tabBarShowLabel: false,
  headerShown: false,
});

const mapOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => (
    <Icon
      name={focused ? 'map-marker' : 'map-marker-outline'}
      size={35}
      color="#263238"
    />
  ),
});

const favoritesOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => (
    <Icon
      name={focused ? 'heart' : 'heart-outline'}
      size={33}
      color="#263238"
    />
  ),
});

export default Router;
