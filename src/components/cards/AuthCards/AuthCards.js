import React from 'react';
import {View, Text} from 'react-native';

const AuthCards = ({activeTab}) => {
  if (activeTab === 'login') {
    return (
      <View>
        <Text>Login Formu</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Register Formu</Text>
      </View>
    );
  }
};

export default AuthCards;
