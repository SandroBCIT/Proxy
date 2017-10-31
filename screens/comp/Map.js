import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Alert, View, Text, Button } from 'react-native';
import MapSearch from './MapSearch';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
var targetMarker = null;
var locRefresh = null;
var setRadiusBtn = null;
var remRadiusBtn = null;
var radiusMarker = null;
var coverView = null;

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
            locationMarkerPosition: {
                latitude: 0,
                longitude: 0
            },
            circleRadius: 10,
            circleIndex: 9999,
            testPosition: {
                latitude: 49.2827,
                longitude: -123.1207
            },
            checkDistance: false,
        }
        
        this.myCallback = this.myCallback.bind(this);
        this.setRadius = this.setRadius.bind(this);
        this.remRadius = this.remRadius.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
    }
    
    //before component gets rendered
    componentWillMount(){
        //only used for initial position - gets overwritten later in this function
        var latDelta = LATITUDE_DELTA
        var longDelta = LONGITUDE_DELTA
        
        //updates location marker (blue circle)
        locRefresh = setInterval(()=>{
            
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
                var latDelta2 = latDelta
                var longDelta2 = longDelta
                
                var lastScreenRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: latDelta2,
                    longitudeDelta: longDelta2
                }

                var lastMarkerRegion = {
                    latitude: lat,
                    longitude: long
                }

                this.setState({
                    screenPosition: lastScreenRegion,
                    locationMarkerPosition: lastMarkerRegion
                });

                latDelta = parseFloat(position.coords.latitudeDelta)
                longDelta = parseFloat(position.coords.longitudeDelta)

            }, (error)=> this.setState({alertMsg:alert}), {enableHighAccuracy: true, timeout: 1000, maximumAge: 500})
            
            if(this.state.checkDistance == true){
                //converts radius from meters to lat/long scale
                var radius = (0.00001*(this.state.circleRadius));
                
                var xLoc = this.state.locationMarkerPosition['longitude'];
                var yLoc = this.state.locationMarkerPosition['latitude'];
                var xDest = this.state.targetMarkerPosition['longitude'];
                var yDest = this.state.targetMarkerPosition['latitude'];

                //calculates distance from location to targetMarker
                var distance = Math.sqrt(Math.pow((xLoc-xDest),2)+Math.pow((yLoc-yDest),2));
                
                if(distance <= radius){
                    alert('You have ARRIVED');
                    this.setState({
                        checkDistance: false        
                    });
        
                    radiusMarker = null;
                    remRadiusBtn = null;
                    coverView = null;
                }
            }
            
        }, 500); 
    }
    
    //grabs location data (long/lat) from MapSearch component and updates screenPosition
    myCallback(data){
        radiusMarker = null;
        
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
            searchLocation: searchLocation,
            screenPosition: searchLocation,
            targetMarkerPosition: searchLocation
        });
        
        targetMarker =  <MapView.Marker 
                            coordinate={this.state.targetMarkerPosition}
                        />;
        
        setRadiusBtn =  <Button
                            style = {styles.setRadiusBtn}
                            title='Set Radius'
                            color='green'
                            onPress={this.setRadius}
                        />;  
    }
    
    onLongPress(data){
        radiusMarker = null;  
        
        var longPressLat = parseFloat(JSON.stringify(data.nativeEvent.coordinate['latitude']));
        var longPressLong = parseFloat(JSON.stringify(data.nativeEvent.coordinate['longitude']));
        
        var newTargetMarker = {
            latitude: longPressLat,
            longitude: longPressLong,   
        }
        
        this.setState({
            targetMarkerPosition: newTargetMarker
        });
        
        targetMarker =  <MapView.Marker 
                            coordinate={{latitude: longPressLat, longitude: longPressLong}}
                        />; 

        setRadiusBtn =  <Button
                            style = {styles.setRadiusBtn}
                            title='Set Radius'
                            color='green'
                            onPress={this.setRadius}
                        />;  
    }
    
    setRadius(){
        this.setState({
            checkDistance: true   
        });
        
        radiusMarker =  <MapView.Circle 
                            center={{latitude: this.state.targetMarkerPosition.latitude, longitude: this.state.targetMarkerPosition.longitude}}
                            radius={this.state.circleRadius}
                            zIndex={this.state.circleIndex}
                            fillColor='lightgreen'
                        />;
                            
        remRadiusBtn =  <Button
                            style = {styles.setRadiusBtn}
                            title='Cancel'
                            color='red'
                            onPress={this.remRadius}
                        />; 

        coverView =     <View
                            style = {styles.coverView}
                        />;
    }
    
    remRadius(){
        this.setState({
            checkDistance: false   
        });
        
        radiusMarker = null;
        remRadiusBtn = null;
        coverView = null;
    }
    
    componentWillUnmount(){
        clearInterval(locRefresh);
    }

   

//-------------------------------------------------------------------------

    render() {
        return (
            <View style={styles.viewContainer}>
                <MapView
                    provider='google'
                    style={styles.map}
                    region={this.state.screenPosition}
                    rotateEnabled={false}
                    loadingEnabled={true}
                    onLongPress={(data) => this.onLongPress(data)}
                >
            
                    {radiusMarker}
                    {targetMarker}

                    <MapView.Marker 
                        coordinate={this.state.locationMarkerPosition}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View style={styles.locationRadius}>
                            <View style={styles.locationMarker} />
                        </View>
                    </MapView.Marker>
                </MapView>
                <MapSearch hamburgerFunction={this.props.hamburgerFunction} callbackFromParent={this.myCallback} />
                {coverView}
                {setRadiusBtn}
                {remRadiusBtn}
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
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationMarker: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    coverView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
    
});

export default Map;