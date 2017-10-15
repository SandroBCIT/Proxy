import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Alert, View, Text } from 'react-native';
import MapSearch from './MapSearch';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Map extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            screenPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
        }
        
        this.myCallback = this.myCallback.bind(this);
    }
    
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude) 
                
                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                
                this.setState({
                    screenPosition: initialRegion,
                    markerPosition: initialRegion
                });
                
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude) 
                
                
                var lastRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                
                this.setState({
                    screenPosition: lastRegion,
                    markerPosition: lastRegion
                });
            },
            (error) => alert(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
        );
    }
    
    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchId);
    }
    
    myCallback(data){
        
        navigator.geolocation.clearWatch(this.watchId);
        
        var latData = parseFloat(data['latitude']);
        var longData = parseFloat(data['longitude']);
        var latDeltaData = LATITUDE_DELTA;
        var longDeltaData = LONGITUDE_DELTA;
        
        var searchLocation = {
            latitude: latData,
            longitude: longData,
            latitudeDelta: latDeltaData,
            longitudeDelta: longDeltaData
        }
        
        this.setState({
            screenPosition:searchLocation    
        });
    }
    
    
//    componentWillMount(){
//        alert("mounted");
//        var locRefresh = setInterval(()=>{
//                if(this.watchID){
//                    navigator.geolocation.clearWatch(this.watchID);
//                }
//
//                this.watchID  = navigator.geolocation.watchPosition((position) => {
//                    var lat = parseFloat(position.coords.latitude)
//                    var long = parseFloat(position.coords.longitude) 
//
//                    var lastRegion = {
//                        latitude: lat,
//                        longitude: long,
//                        latitudeDelta: LATITUDE_DELTA,
//                        longitudeDelta: LONGITUDE_DELTA
//                    }
//
//                    this.setState({
//                        screenPosition: lastRegion,
//                        markerPosition: lastRegion
//                    });
//
//                    LATITUDE_DELTA = parseFloat(position.coords.latitudeDelta)
//                    LONGITUDE_DELTA = parseFloat(position.coords.longitudeDelta)
//
//                }, (error)=> alert(error), {enableHighAccuracy: true, timeout: 1000, maximumAge:500})
//        }, 500); 
//    }
//    
//    componentWillUnmount(){
//        clearInterval(1);
//        alert("unmounted");
//    }

   

//-------------------------------------------------------------------------

    render() {
        return (
            <View style={styles.viewContainer}>
            <MapView
                provider= 'google'
                style={styles.map}
                region={this.state.screenPosition} >

                <MapView.Marker coordinate={this.state.markerPosition} >
                    <View style={styles.locationRadius}>
                        <View style={styles.locationMarker} />
                    </View>
                </MapView.Marker>
            </MapView>
            <MapSearch callbackFromParent={this.myCallback} />
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    },
    locationRadius: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
    },
    locationMarker: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    }
});

export default Map;