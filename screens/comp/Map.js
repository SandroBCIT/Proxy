import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Alert } from 'react-native';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.001
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Map extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }  
    }
    
    watchID: ?number = null

    //When map loads
    componentDidMount() {
        setInterval(()=>{
            if(this.watchID){
                navigator.geolocation.clearWatch(this.watchID);
            }
            
            this.watchID  = navigator.geolocation.watchPosition((position) => {
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
                
//              Lets you change the screenLocation
                LATITUDE_DELTA = parseFloat(position.coords.latitudeDelta)
                LONGITUDE_DELTA = parseFloat(position.coords.longitudeDelta)
                
                //alert("UPDATE");
            }, (error)=> alert(error), {enableHighAccuracy: false, timeout: 1000, maximumAge:0, distanceFilter:0.1})
            
        }, 500);
        
        
//        if(this.state.initialPosition.latitude){
//            Alert.alert(
//                'Alert Title',
//                'My Alert Msg',
//                [
//                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//                {text: 'OK', onPress: () => console.log('OK Pressed')},
//                ],
//                { cancelable: false }
//            )
//        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        return (
            <MapView 
                style={styles.map}
                region={this.state.screenPosition}>

                <MapView.Marker
                    coordinate={this.state.markerPosition}
                />
            </MapView>
            
        );
    }
}

const styles = StyleSheet.create({
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    }
});

export default Map;