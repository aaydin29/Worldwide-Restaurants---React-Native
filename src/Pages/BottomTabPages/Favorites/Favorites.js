import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

import AuthModal from '../../../components/modals/AuthModal/AuthModal';

import styles from './Favorites.style';

const Favorites = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Favorites</Text>
      </View>
      <TouchableOpacity onPress={handleModal}>
        <Text>MODALL</Text>
      </TouchableOpacity>
      <AuthModal isVisible={modalVisible} />
    </View>
  );
};

export default Favorites;
