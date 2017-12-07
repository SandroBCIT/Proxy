import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, UIManager, Platform } from 'react-navigation';

import Expo from 'expo';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DrawerMenu from './screens/MenuScreen';


const Drawer  = DrawerNavigator({
    Login: { 
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })},
    Home: { 
        screen: HomeScreen 
    },
    Settings: { screen: SettingsScreen }
	},
	{
    contentComponent: props => <DrawerMenu {...props} />   
	});

export default class DrawerBuild extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			userName: 'Some Guy',
			photoURL: './assets/add.png',
			fontReady: false
		}
	}
	
	async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-regular': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-semibold': require('./assets/font/OpenSans-SemiBold.ttf'),
        });

        this.setState({ fontReady: true });
    }
	
	setUserInfo = (val) => {
		this.setState({
			userName: val.displayName,
			photoURL: val.photoURL
		});
	}
	
	render(){
		
		if (this.state.fontReady) {
			return(
				<Drawer screenProps={{
					userName: this.state.userName,
					photoURL: this.state.photoURL,
				
					setUserInfo: this.setUserInfo,
					
				}} />
			);
		} else {
			return null;
		}
	}
	
}