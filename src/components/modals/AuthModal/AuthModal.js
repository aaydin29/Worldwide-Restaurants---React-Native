import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import AuthCards from '../../cards/AuthCards/AuthCards';
import styles from './AuthModal.style';

const AuthModal = ({isVisible, onClose}) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Modal
      backdropOpacity={0.6}
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.tabs_container}>
          <TouchableOpacity
            style={[
              styles.tab_buttons,
              activeTab === 'login' && styles.active_tab_buttons,
            ]}
            onPress={() => setActiveTab('login')}>
            <Text style={styles.tabs_title}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab_buttons,
              activeTab === 'register' && styles.active_tab_buttons,
            ]}
            onPress={() => setActiveTab('register')}>
            <Text style={styles.tabs_title}>Register</Text>
          </TouchableOpacity>
        </View>
        {<AuthCards activeTab={activeTab} />}
      </View>
    </Modal>
  );
};

export default AuthModal;
