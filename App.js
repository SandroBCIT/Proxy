import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import DrawerMenu from './screens/MenuScreen';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';


export default Proxy = DrawerNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
    Login: { 
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })},
},
{
    contentComponent: props => <DrawerMenu {...props} />   
});