import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

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
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
      });
    }
  }
  async function handleRegister(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Passwords must match!',
        type: 'danger',
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
      });
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
      });
    }
  }

  if (activeTab === 'login') {
    return (
      <View>
        <Formik initialValues={initialLoginFormValues} onSubmit={handleLogin}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <TextInput
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  } else {
    return (
      <View>
        <Formik
          initialValues={initialRegisterFormValues}
          onSubmit={handleRegister}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <TextInput
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
              />
              <TextInput
                placeholder="Password again"
                value={values.repassword}
                onChangeText={handleChange('repassword')}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
};

export default AuthCards;
