import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MapView from 'react-native-maps';

const {width,height} = Dimensions.get('window')

const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        
        //setting initial values
        this.state = {
            initialPosition: {
                latitude: 49.248805,
                longitude: -123.001191,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,   
            }, 
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }   
    }
    
    watchID: ?number = null

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            
            //so screen follows marker
            this.setState({initialPosition: initialRegion})
            this.setState({markerPosition: initialRegion}) 
        },(error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge:1000})
        
// SOMETHING WRONG HERE!        
//        this.watchID  = navigator.geolocation.watchPosition((position) => {
//            var lat = parseFloat(position.coords.latitude)
//            var long = parseFloat(position.coords.longitude) 
//            
//            var lastRegion = {
//                latitude: lat,
//                longitude: long,
//                latitudeDelta: LATITUDE_DELTA,
//                longitudeDelta: LONGITUDE_DELTA
//            }
//            
//            this.setState({initialPosition: lastRegion})
//            this.setState({markerPosition: lastRegion})
//        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <MapView 
                    style={styles.map}
                    region={this.state.initialPosition}>
                
                    <MapView.Marker
                        coordinate={this.state.markerPosition}
                    />
                </MapView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'gray',
        paddingHorizontal: 50,
    },
    icon: {
        width: 24,
        height: 24,
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    }
});

export default HomeScreen;