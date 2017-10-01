import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

//Importing Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

export default Proxy = StackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
});