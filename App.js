import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, UIManager } from 'react-navigation';
import { Dimensions, Alert, Vibration, Platform } from 'react-native';

import Expo, { Constants, Location, Permissions } from 'expo';

//Importing Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DrawerMenu from './screens/MenuScreen';
import LoadingScreen from './screens/comp/LoadingScreen';

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
var watchID = null;
    
const Drawer  = DrawerNavigator({
    Login: { 
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })},
    Home: { 
        screen: HomeScreen 
    }},
	{
	drawerWidth: Dimensions.get('window').width,
	drawerBackgroundColor: 'rgba(0,0,0,0)',
    contentComponent: props => <DrawerMenu {...props} />  
	});

const ColorPalette = {
	light: {
		text: '#f2f2f2',
		primary: '#5f3b9a',
		primaryBut: '#f2f2f2',
		butText: '#5f3b9a',
		secondary: '#1f9668',
	},
	dark: {
		text: '#f2f2f2',
		primary: '#3c1e5f',
		primaryBut: '#5f3b9a',
		butText: '#f2f2f2',
		secondary: '#1f9668',
	}
}

export default class DrawerBuild extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			userName: 'Some Guy',
			photoURL: './assets/add.png',
			email: undefined,
			finishedLoading: false,
            screenPosition: {
                latitude: 49.251161,
                longitude: -123.003445,
                latitudeDelta: 0.05,
                longitudeDelta: 0
            },
            locationMarkerPosition: {
                latitude: 49.251161,
                longitude: -123.003445,
                latitudeDelta: 0.05,
                longitudeDelta: 0
            },
            followLoc: true,
            checkDistance: false,
            showFollowLocBtn: false,
			nightMode: false,
			drawerOpen: false,
            sliderValue: 100
		}
	}
    
	componentWillMount(){
        latDelta = LATITUDE_DELTA
        longDelta = LONGITUDE_DELTA
        
        //initial Location
//        navigator.geolocation.getCurrentPosition((position) => {
//            var lat = parseFloat(position.coords.latitude)
//            var long = parseFloat(position.coords.longitude)
//
//            var lastScreenRegion = {
//                latitude: lat,
//                longitude: long,
//                latitudeDelta: latDelta,
//                longitudeDelta: longDelta
//            }
//
//            var lastMarkerRegion = {
//                latitude: lat,
//                longitude: long,
//                latitudeDelta: latDelta,
//                longitudeDelta: longDelta
//            }
//
//            this.setState({
//                screenPosition: lastScreenRegion,
//                locationMarkerPosition: lastMarkerRegion
//            });
//
//            latDelta = parseFloat(position.coords.latitudeDelta)
//            longDelta = parseFloat(position.coords.longitudeDelta)
//
//        }, (error)=> this.setState({alertMsg:alert}), {enableHighAccuracy: true, timeout: 1000, maximumAge: 500})
        
        //Location Check   
        if (Platform.OS === 'android' && !Constants.isDevice) {
            alert('Try on real device');
        } else {
            this._getLocationAsync();
        }
    }
    
	async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-regular': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-semibold': require('./assets/font/OpenSans-SemiBold.ttf'),
        });
		
		setTimeout(()=>{
			this.setState({ finishedLoading: true });
		}, 3000);
		
//		if (Platform.OS === 'android' && !Constants.isDevice) {
//            alert('Try on real device');
//        } else {
//            this._getLocationAsync();
//        }
    }
	
	setUserInfo = (val) => {
		this.setState({
			userName: val.displayName,
			photoURL: val.photoURL,
			email: val.email
		});
	}
    
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        
        let location = await Location.watchPositionAsync({enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1},(position)=>{
            if(this.state.followLoc === true){
                var lastScreenRegion = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: longDelta
                }
                
                this.setState({
                    screenPosition: lastScreenRegion
                });  
            }
            
            var lastMarkerRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta
            }

            this.setState({
                locationMarkerPosition: lastMarkerRegion
            });
            
            if(this.state.checkDistance === true){
                this.checkDistanceFunc();
            } 
        });
    };

    checkDistanceFunc = () => {
        //converts radius from meters to lat/long scale
        var radius = (0.00001*(this.state.sliderValue));

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

            if(this.state.alertMethod === 1){
                this.displayAlert()
            }else if(this.state.alertMethod === 2){
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
            this.setState({
                checkDistance: false
            })
            
            //removes the running window after alarm is triggered
            this.setState({
                removeRunningWindow: true    
            })
            setTimeout(() => {
                this.setState({
                    removeRunningWindow: false,
                });
            }, 100)

            //hides target marker and radius circle after alarm is triggered
            this.setState({
                showTargetMarkerRemote: false,
                showRadiusCircleRemote: false
            })
            setTimeout(() => {
                this.setState({
                    showTargetMarkerRemote: true,
                    showRadiusCircleRemote: true
                });
            }, 100)

            //enables functions
            this.setState({
                disableFunctionsRemote: false
            })
            setTimeout(() => {
                this.setState({
                    disableFunctionsRemote: true    
                });
            }, 100)

        }    
    }

    setCheckDistance = (data) => {
        this.setState({
            checkDistance: data
        })
        if(data === true){
            this.checkDistanceFunc();
        }
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
	
	toggleNightMode = () => {
		if (this.state.nightMode === true) {
			this.setState({ nightMode: false })
		} else if (this.state.nightMode === false) {
			this.setState({ nightMode: true })
		}
	}
	
	toggleDrawer = () => {
		if (this.state.drawerOpen === true) {
			this.setState({ drawerOpen: false })
		} else {
			this.setState({ drawerOpen: true })
		} 
	}
    
    onSearchLocation = (searchLocation) => {
        var searchTarget = {
            latitude: searchLocation.latitude,
            longitude: searchLocation.longitude
        }
        this.setState({
            screenPosition: searchLocation,
            targetMarkerPosition: searchTarget
        });   
    }
    
    onMapLongPress = (newTargetMarker) => {
        this.setState({
            targetMarkerPosition: newTargetMarker
        });    
    }
    
    setSliderValue = (data) => {
        this.setState({
            sliderValue: data
        })
    }
    
    setAlertMethod = (data) => {
        this.setState({
            alertMethod: data
        }) 
    }
    
    async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-regular': require('./assets/font/OpenSans-Light.ttf'),
			'open-sans-semibold': require('./assets/font/OpenSans-SemiBold.ttf'),
        });
		
		setTimeout(()=>{
			this.setState({ finishedLoading: true });
		}, 3000);
    }
    
	setUserInfo = (val) => {
		this.setState({
			userName: val.displayName,
			photoURL: val.photoURL,
            email: val.email
		});
	}
    
    setToFollowLoc = () => {
        this.setState({
            screenPosition: this.state.locationMarkerPosition,
            followLoc: true,
            showFollowLocBtn: false
        })
    }
    
	render(){
		if (this.state.finishedLoading) {
			return(
				<Drawer screenProps={{
					userName: this.state.userName,
					photoURL: this.state.photoURL,
					email: this.state.email,
					nightMode: this.state.nightMode,
					toggleNightMode: this.toggleNightMode,
				
					setUserInfo: this.setUserInfo,
					
                    setScreenPosition: this.state.screenPosition,
                    setLocationMarkerPosition: this.state.locationMarkerPosition,
					palette: ColorPalette,
					toggleDrawer: this.toggleDrawer,
					drawerOpen: this.state.drawerOpen,
                    setTargetMarkerPosition: this.state.targetMarkerPosition,
                    setAlertMethod: this.setAlertMethod,
                    setToFollowLoc: this.setToFollowLoc,
                
                    onSearchLocation: this.onSearchLocation,
                    onMapLongPress: this.onMapLongPress,
                    onRegionChange: this.onRegionChange,
                    regionLat: this.state.regionLat,
                
                    disableFunctionsRemote: this.state.disableFunctionsRemote,
                    showTargetMarkerRemote: this.state.showTargetMarkerRemote,
                    showRadiusCircleRemote: this.state.showRadiusCircleRemote,
                    showFollowLocBtn: this.state.showFollowLocBtn,
                    
                    removeRunningWindow: this.state.removeRunningWindow,
                    checkDistance: this.setCheckDistance,
                    setSliderValue: this.setSliderValue,
                    sliderValue: this.state.sliderValue
				}} />
			);
		} else {
			return <LoadingScreen />;
		}
	}
	
}