import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Login from '../pages/Login';

import Register from '../pages/Register';
import Producer from '../pages/Producer';
import InitialPage from '../pages/IntialPage';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InitialPage' screenOptions={{headerTitle: '', headerShown: false}}>
        <Stack.Screen name='InitialPage' component={InitialPage}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Producer' component={Producer as React.ComponentType}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
