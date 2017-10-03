import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';

export const Drawer = DrawerNavigator({
    Home: {
        screen: HomeScreen, 
        navigationOptions: {
            drawer: {
                label: 'Home'
            }
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            drawer: {
                label: 'Settings'
            }
        }
    },
    Contact: {
        screen: ContactScreen,
        navigationOptions: {
            drawer: {
                label: 'Contact'
            }
        }
    }
})