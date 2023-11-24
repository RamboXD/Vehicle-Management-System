/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginPage from './src/Auth/Login';
import AdminPage from './src/Profiles/Admin';
import DriverPage from './src/Profiles/Driver';
import FuelPersonPage from './src/Profiles/FuelPerson';
import MaintenancePersonPage from './src/Profiles/MaintenancePerson';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Admin" component={AdminPage} />
        <Stack.Screen name="Driver" component={DriverPage} />
        <Stack.Screen name="FuelPerson" component={FuelPersonPage} />
        <Stack.Screen name="MaintenancePerson" component={MaintenancePersonPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
