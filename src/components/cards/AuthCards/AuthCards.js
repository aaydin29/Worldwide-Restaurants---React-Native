import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import styles from './AuthCards.style';
import authErrorMessages from '../../../utils/authErrorMessages';

const initialLoginFormValues = {
  email: '',
  password: '',
};
const initialRegisterFormValues = {
  email: '',
  password: '',
  repassword: '',
};

const AuthCards = ({activeTab}) => {
  async function handleLogin(formValues) {
    try {
      await auth().signInWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      showMessage({
        message: 'Login successful!',
        type: 'success',
        floating: true,
      });
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
        floating: true,
      });
    }
  }
  async function handleRegister(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Passwords must match!',
        type: 'danger',
        floating: true,
      });
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.email,
        formValues.repassword,
      );
      showMessage({
        message: 'Account created successfully!',
        type: 'success',
        floating: true,
      });
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
        floating: true,
      });
    }
  }

  if (activeTab === 'login') {
    return (
      <View style={styles.container}>
        <Formik initialValues={initialLoginFormValues} onSubmit={handleLogin}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <TextInput
                style={styles.inputs}
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.buttons}>
                <Text style={styles.button_text}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={initialRegisterFormValues}
          onSubmit={handleRegister}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <TextInput
                style={styles.inputs}
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              <TextInput
                style={styles.inputs}
                placeholder="Repassword"
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                secureTextEntry
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.buttons}>
                <Text style={styles.button_text}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
};

export default AuthCards;
