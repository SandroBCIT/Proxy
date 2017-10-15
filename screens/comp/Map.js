import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Alert, View } from 'react-native';

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
            locationPosition: {
                latitude: 0,
                longitude: 0
            }
        }  
    }
    
    watchID: ?number = null

    //When map loads
    componentDidMount() {
        var locRefresh = setInterval(()=>{
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
                    locationPosition: lastRegion
                });
                
//              Lets you change the screenLocation
                LATITUDE_DELTA = parseFloat(position.coords.latitudeDelta)
                LONGITUDE_DELTA = parseFloat(position.coords.longitudeDelta)
                
                //alert("UPDATE");
            }, (error)=> alert(error), {enableHighAccuracy: false, timeout: 1000, maximumAge:0, distanceFilter:0.1})
            
        }, 500);
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
        clearInterval(locRefresh);
    }

//-------------------------------------------------------------------------

    render() {
        return (
            <MapView
                provider= 'google'
                style={styles.map}
                region={this.state.screenPosition}>

                <MapView.Marker coordinate={this.state.locationPosition} >
                    <View style={styles.locationRadius}>
                        <View style={styles.locationMarker} />
                    </View>
                </MapView.Marker>
            </MapView>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
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