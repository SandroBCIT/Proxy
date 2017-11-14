import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DrawerMenu from './screens/MenuScreen';


export default DrawerNavigator({
    Home: { 
        screen: HomeScreen 
    },
    Login: { 
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })},
    Settings: { screen: SettingsScreen }
},
{
    contentComponent: props => <DrawerMenu {...props} />   
});