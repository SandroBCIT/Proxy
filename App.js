import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, UIManager, Platform } from 'react-navigation';
import { Dimensions, Alert, Vibration } from 'react-native';

import Expo from 'expo';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DrawerMenu from './screens/MenuScreen';

const {width,height} = Dimensions.get('window');
const SCREENHEIGHT = height;
const SCREENWIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var locRefresh = null;
var latDelta = null;
var longDelta = null;
var counter = 0;

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
			fontReady: false,
            screenPosition: {
                latitude: 49.2827,
                longitude: -123.1207,
                latitudeDelta: 0.05,
                longitudeDelta: 0
            },
            locationMarkerPosition: {
                latitude: 0,
                longitude: 0
            },
            initialize: true,
            followLoc: true,
            checkDistance: false,
            showFollowLocBtn: false
		}
	}
    
	componentWillMount(){
        this.startRefresh();
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
	
    startRefresh = ()=>{
        this.locRefresh();
    }
    
    clearRefresh = ()=>{
        clearInterval(locRefresh);
    }
    
    locRefresh = ()=>{
        latDelta = LATITUDE_DELTA
        longDelta = LONGITUDE_DELTA
        
        locRefresh = setInterval(()=>{
            
            this.findLocation();
            
            //to have distanceChecker only run every 10th loop (1s)
            if(counter === 10){
                if(this.state.checkDistance === true){
                    //converts radius from meters to lat/long scale
                    var radius = (0.00001*(this.props.sliderValue));

                    var xLoc = this.state.locationMarkerPosition['longitude'];
                    var yLoc = this.state.locationMarkerPosition['latitude'];
                    var xDest = this.state.targetMarkerPosition['longitude'];
                    var yDest = this.state.targetMarkerPosition['latitude'];

                    //calculates distance from location to targetMarker
                    var distance = Math.sqrt(Math.pow((xLoc-xDest),2)+Math.pow((yLoc-yDest),2));

                    if(distance <= radius){
    //                    const DURATION = 1000
                        const PATTERN = [0, 1000, 300, 1000, 300, 1000, 300]
    //                    Vibration.vibrate(DURATION)
                        Vibration.vibrate(PATTERN)
    //                    Vibration.vibrate(PATTERN, true)
    //                    Vibration.cancel()

                        if(this.props.alertMethod === 1){
                            this.displayAlert()
                        }else if(this.props.alertMethod === 2){
                            //Expo Notification
                            var localNotification = {
                                title: 'You have arrived!!',
                                body: 'This is Proxy. You are close to your set destination!',
                                ios: {
                                    sound: true
                                },
                                android: {
                                    sound: true
                                }
                            }
                            Expo.Notifications.presentLocalNotificationAsync(localNotification)
                        }

                        //resetting variables
                        this.props.stopCheckDistance(false)
                        this.props.removeRunningWindow(false)

                        //hides target marker and radius circle
                        this.setState({
                            showTargetMarker: false,
                            showRadiusCircle: false
                        })

                        //enables functions
                        this.props.disableFunctionsRemote(false)
                    }
                }  
                counter = 0;
            }
            counter ++;    
        }, 100) 
    }
    
    findLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            
                if(this.state.initialize === true || this.state.followLoc === true){
                    //makes the screen follow the locationMarker
                    var lastScreenRegion = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: latDelta,
                        longitudeDelta: longDelta
                    }
                    this.setState({
                        screenPosition: lastScreenRegion
                    });
                }
                this.setState({
                    initialize: false
                })

            var lastMarkerRegion = {
                latitude: lat,
                longitude: long
            }

            this.setState({
                locationMarkerPosition: lastMarkerRegion
            });

        }, (error)=> this.setState({alertMsg:alert}), {enableHighAccuracy: true, timeout: 1000, maximumAge: 500})
    }
    
//     //shows on screen alert (NOT alarm)
    displayAlert = ()=>{
        Alert.alert(
            'You are almost there!',
            '',
            [
                {text: 'OK', onPress: () =>{
                        Vibration.cancel()
                        remRadiusBtn = null
                        this.setState({
                            showRadius: false
                        })
                    }
                }
            ],
            { cancelable: false }
            ) 
    }
    
    onRegionChange = (region) => {
        this.setState({
            screenPosition: region,
            showFollowLocBtn: true,
            followLoc: false
        })
    }
    
	render(){
		
		if (this.state.fontReady) {
			return(
				<Drawer screenProps={{
					userName: this.state.userName,
					photoURL: this.state.photoURL,
				
					setUserInfo: this.setUserInfo,
					
                    setScreenPosition: this.state.screenPosition,
                    setLocationMarkerPosition: this.state.locationMarkerPosition,
                    onRegionChange: this.onRegionChange
				}} />
			);
		} else {
			return null;
		}
	}
	
}