import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Producer from '../pages/Producer';
import InitialPage from '../pages/IntialPage';
import Products from '../pages/Products';
import {Image} from 'react-native';
import Profile from '../pages/Profile';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabsRoutes() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Produtores" component={Home} options={{
        tabBarIcon: () => (
          <Image source={require('../assets/producers.png')} style={{width: 24, height: 24}}/>
        )
      }}/>
      <Tab.Screen name="Produtos" component={Products} options={{
        tabBarIcon: () => (
          <Image source={require('../assets/products.png')} style={{width: 24, height: 24}}/>
        )
      }}/>
      <Tab.Screen name="Perfil" component={Profile} options={{
        tabBarIcon: () => (
          <Image source={require('../assets/profile.png')} style={{width: 24, height: 24}}/>
        )
      }}/>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InitialPage' screenOptions={{headerTitle: '', headerShown: false}}>
        <Stack.Screen name='InitialPage' component={InitialPage}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Tab' component={TabsRoutes}/>
        <Stack.Screen name='Producer' component={Producer as React.ComponentType}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
