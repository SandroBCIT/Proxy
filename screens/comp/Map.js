import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Dimensions, Alert, View, Text, Button, Vibration } from 'react-native';
import MapSearch from './MapSearch';
import HamburgerBtn from './HamburgerBtn';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
var remRadiusBtn = null
var radiusCircle = null
var removePinBtn = null
var locRefresh = null
var latDelta = null
var longDelta = null
var longPressLat = null
var longPressLong = null

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
            circleIndex: 9999
        }
    }
    
    componentWillMount(){
        this.startRefresh();
        this.setState({
            initialize: true
        })
    }
    
    startRefresh = ()=>{
        this.locRefresh();
    }
    
    clearRefresh = ()=>{
        clearInterval(locRefresh);
    }
    
    findLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var latDelta2 = latDelta
            var longDelta2 = longDelta

                if(this.state.initialize === true){
                    var lastScreenRegion = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: latDelta2,
                        longitudeDelta: longDelta2
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
    
    locRefresh = ()=>{
        latDelta = LATITUDE_DELTA
        longDelta = LONGITUDE_DELTA
        
        locRefresh = setInterval(()=>{
            
            this.findLocation();
            
            if(this.props.checkDistance === true){
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
                    const PATTERN = [0, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000, 300, 1000]
                    
//                    fast version[0, 50, 200, 50, 50, 50, 50, 50, 200, 50, 450, 50, 200, 50, 450]
//                    slow version[0, 100, 400, 100, 100, 100, 100, 100, 400, 100, 900, 100, 400, 100,400]

//                    Vibration.vibrate(DURATION)

                    Vibration.vibrate(PATTERN)

//                    Vibration.vibrate(PATTERN, true)

//                    Vibration.cancel()
                    
                    this.displayAlert();
                    
                    //resetting variables
                    this.props.stopCheckDistance(false)
                    this.props.toggleSetupWindow(false)
                    this.props.removeRunningWindow(false)
                    
                    this.setState({
                        showRadiusCircle: false,
                        showRadius: false
                    })
                    remRadiusBtn = null
                    targetMarker = null
                }   
            }
            
        }, 1000) 
    }
    
    displayAlert = ()=>{
        Alert.alert(
            'You have Arrived!!',
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
    
    //grabs location data (long/lat) from MapSearch component and updates screenPosition
    myCallback = (data)=>{
        this.setState({
            showRadius: false
        })
        
        var latData = parseFloat(data['latitude'])
        var longData = parseFloat(data['longitude'])
        var latDeltaData = LATITUDE_DELTA
        var longDeltaData = LONGITUDE_DELTA
        
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
                            image={require("../../img/pin-01.png")}
                        />;
        
        this.setState({
            showSetRadiusBtn: true
        })  
    }
    
    //when long pressing map 
    onLongPress = (data)=>{
        if(targetMarker != null){ 
            this.setState({
                showTargetMarker: false,
                showRadiusCircle: false
            })
            this.props.toggleSetupWindow(false);
        }
        
        //grabs details about where the map is pressed on
        longPressLat = parseFloat(JSON.stringify(data.nativeEvent.coordinate['latitude']));
        longPressLong = parseFloat(JSON.stringify(data.nativeEvent.coordinate['longitude']));
        var newTargetMarker = {
            latitude: longPressLat,
            longitude: longPressLong,   
        }
        this.setState({
            targetMarkerPosition: newTargetMarker
        });

        this.props.toggleSetupWindow(true);
        this.setState({
            showTargetMarker: true,
            showRadius: true
        })
    }
    
    onMapPress = ()=>{
        if(targetMarker !== null){
            targetMarker = null;  
            removePinBtn = null;
            this.setState({
                showRadius: false
            })
            this.props.toggleSetupWindow(false);
        }
        
        //unfocuses from the map search
        this.setState({
            blurProp: true
        })
        setInterval(()=>{
            this.setState({
                blurProp: false
            })
        }, 100)
    }
           
    setRadius = ()=>{
        this.props.toggleSetupWindow(true)
        this.setState({
            showRadius: true
        })
                               
        removePinBtn = null
    }
    
    componentWillUnmount(){
        this.clearRefresh()
    }

//-------------------------------------------------------------------------

    render() {
        //Target Marker
        var targetMarker = null
        if(this.state.showTargetMarker === true){
            targetMarker = 
                <MapView.Marker 
                    coordinate={{latitude: longPressLat, longitude: longPressLong}}
                    image={require("../../img/pin-01.png")}
                />
        }else if(this.state.showTargetMarker === false){
            targetMarker = null   
        }
        
        //Radius Circle
        var radiusCircle =  null
        if(this.state.showRadiusCircle === true){
            radiusCircle = 
                <MapView.Circle 
                    center={{latitude: this.state.targetMarkerPosition.latitude, longitude: this.state.targetMarkerPosition.longitude}}
                    radius={this.props.sliderValue}
                    zIndex={this.state.circleIndex}
                    fillColor='rgba(88,55,143,0.3)'
                    strokeWidth={0}
                />
        }else if(this.state.showRadius === false){
            radiusCircle = null   
        }
        
        return (
            <View style={styles.viewContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.screenPosition}
                    onRegionChange={(reg)=>{
                        this.setState({screenPosition:reg})
                    }}
                    rotateEnabled={false}
                    loadingEnabled={true}
                    onLongPress={(data) => this.onLongPress(data)}
                    onPress={this.onMapPress}
                >

                    {radiusCircle}
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

				<HamburgerBtn hamburgerFunction={this.props.hamburgerFunction} />
                <MapSearch 
                    callbackFromParent={this.myCallback} 
                    giveLocation={this.state.locationMarkerPosition}
                    editingInput={this.editingInput}
                    stopRefresh={this.clearRefresh}
                    startRefresh={this.startRefresh}
                    blurProp={this.state.blurProp}
                />
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'column'
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
        backgroundColor: 'rgba(42,174,120,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationMarker: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: '#58378F',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(88,55,1430,0.7)'
    }
});

export default Map;