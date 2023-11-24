/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik, Field, FormikProps, FieldProps, useField} from 'formik';
import * as Yup from 'yup';

const Login = ({navigation}: {navigation: any}) => {
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const handleLoginFormSubmit = async (values: LoginFormValues) => {
    try {
      // const userData = await login(values.email, values.password);
      // console.log(userData);
      // await AsyncStorage.setItem('userId', userData.user.id);
      // await AsyncStorage.setItem('@access_token', userData.token);
      // await AsyncStorage.setItem('@refresh_token', userData.role);
      // await AsyncStorage.setItem('@refresh_token', userData.status);
      navigation.navigate('Admin');
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex items-center justify-center h-screen bg-blue-500">
        <View className="flex items-center justify-center">
          <Text className="text-slate-200 font-bold text-lg mb-10 flex-wrap text-center">
            Welcome to {'\n'} Vehicle Management System!
          </Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={values => {
              console.log('Formik onSubmit values:', values);
              try {
                handleLoginFormSubmit(values);
              } catch (error) {
                console.error('Error in handleSignUp:', error);
              }
            }}>
            {({
              handleSubmit,
              values,
              handleChange,
              handleBlur,
              errors,
            }: FormikProps<LoginFormValues>) => (
              <View>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#C1C1C1"
                  className="border border-gray-300 rounded p-2 mb-4"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#C1C1C1"
                  className="border border-gray-300 rounded p-2 mb-4"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                />

                <View className="w-full items-center justify-center">
                  {errors.email && (
                    <Text className="text-red-800 text-sm text-center">
                      {errors.email}
                    </Text>
                  )}
                  {errors.password && (
                    <Text className="text-red-800 text-sm text-center">
                      {errors.password}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className="w-36 h-12 rounded-full bg-slate-300 items-center justify-center"
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text className="text-slate-900 font-bold">Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
