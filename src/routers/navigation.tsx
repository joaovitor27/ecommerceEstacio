import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Producer from '../pages/Producer';
import InitialPage from '../pages/IntialPage';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import Product from '../pages/Product';
import MyPurchases from '../pages/MyPurchases';
import ShoppingCart from '../pages/ShoppingCart';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabsRoutes() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} sceneContainerStyle={{
      backgroundColor: 'white',
    }}>
      <Tab.Screen name="Produtores" component={Home} options={{
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: 'rgba(1,107,107,0.56)',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#efefef',
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#008080',
        },
        tabBarIcon: () => (
          <Icon name={'users'} size={20} color={'#008080'}/>
        )
      }}/>
      <Tab.Screen name="Produtos" component={Products} options={{
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: 'rgba(1,107,107,0.56)',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#efefef',
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#008080',
        },
        tabBarIcon: () => (
          <Icon name={'boxes'} size={20} color={'#008080'}/>
        )
      }}/>
      <Tab.Screen name="Carrinho" component={ShoppingCart} options={{
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#008080',
        },
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: 'rgba(1,107,107,0.56)',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#efefef',
        tabBarIcon: () => (
          <Icon name={'shopping-cart'} size={20} color={'#008080'}/>
        )
      }}/>
      <Tab.Screen name="Perfil" component={Profile} options={{
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#008080',
        },
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: 'rgba(1,107,107,0.56)',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#efefef',
        tabBarIcon: () => (
          <Icon name={'address-card'} size={20} color={'#008080'}/>
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
        <Stack.Screen name='Product' component={Product as React.ComponentType}/>
        <Stack.Screen name='MyPurchases' component={MyPurchases}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
