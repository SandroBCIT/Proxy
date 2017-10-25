import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DrawerMenu from './screens/MenuScreen';

export default Proxy = DrawerNavigator({
//    Test: { screen: TestScreen },
//    Login: { 
//        screen: LoginScreen,
//        navigationOptions: ({navigation}) => ({
//        drawerLockMode: 'locked-closed'
//    })},
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen }
},
{
    contentComponent: props => <DrawerMenu {...props} />   
});