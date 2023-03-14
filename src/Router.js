import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Map from './Pages/BottomTabPages/Map/Map';
import Favorites from './Pages/BottomTabPages/Favorites/Favorites';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabPages() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabPages" component={BottomTabPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
