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
var targetMarker = null;
var setRadiusBtn = null;
var remRadiusBtn = null;
var radiusMarker = null;
var removePinBtn = null;

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
            circleIndex: 9999,
//            editingInput: false
        }
        
        this.myCallback = this.myCallback.bind(this);
        this.setRadius = this.setRadius.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.onPressPinRemover = this.onPressPinRemover.bind(this);
//        this.mainRefresh = this.mainRefresh.bind(this);
        this.startRefresh = this.startRefresh.bind(this);
        this.locRefresh = this.locRefresh.bind(this);
        this.circleRefresh = this.circleRefresh.bind(this);
        this.clearRefresh = this.clearRefresh.bind(this);
        this.editingInput = this.editingInput.bind(this);
    }
    
    componentWillMount(){
        this.startRefresh();
    }
    
    startRefresh(){
        this.locRefresh();
        this.circleRefresh(); 
//        this.mainRefresh();
    }
    
    clearRefresh(){
        clearInterval(this.locRefresh);
        clearInterval(this.circleRefresh);
//        clearInterval(this.mainRefresh);
    }
    
//    mainRefresh(){
//        this.circleRefresh = setInterval(()=>{
//            if(this.state.editingInput === true){
//                clearInterval(this.locRefresh)
//                clearInterval(this.circleRefresh) 
//                alert('cleared intervals')
//            }else{
//                this.startRefresh()
//                
//                alert('started intervals')
//            }           
//        }, 1000)              
//    }
    
    //to change circle radius
    circleRefresh(){
        var initVal = this.props.sliderValue;
        this.circleRefresh = setInterval(()=>{
            if(this.props.sliderValue !== initVal){
                radiusMarker =  <MapView.Circle 
                                    center={{latitude: this.state.targetMarkerPosition.latitude, longitude: this.state.targetMarkerPosition.longitude}}
                                    radius={this.props.sliderValue}
                                    zIndex={this.state.circleIndex}
                                    fillColor='lightgreen'
                                />; 
                initVal = this.props.sliderValue;  
            }
            if(this.props.removeOldPin === true){
                radiusMarker = null;
                targetMarker = null;   
            }
        }, 50);
    }
    
    locRefresh(){
        //only used for initial position - gets overwritten later in this function
        var latDelta = LATITUDE_DELTA
        var longDelta = LONGITUDE_DELTA
        var start = false;
        //updates location marker (blue circle)
        this.locRefresh = setInterval(()=>{
            
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
                var latDelta2 = latDelta
                var longDelta2 = longDelta
                
                if(!start){
                    start = true;
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

                var lastMarkerRegion = {
                    latitude: lat,
                    longitude: long
                }

                this.setState({
                    locationMarkerPosition: lastMarkerRegion
                });

            }, (error)=> this.setState({alertMsg:alert}), {enableHighAccuracy: true, timeout: 1000, maximumAge: 500})
            
            
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
                    
                    radiusMarker = null
                    remRadiusBtn = null
                    targetMarker = null
                }   
            }
            
        }, 1000) 
    }
    
    displayAlert(){
        Alert.alert(
            'You have Arrived!!',
            '',
            [
                {text: 'OK', onPress: () =>{
                        Vibration.cancel()
                        radiusMarker = null
                        remRadiusBtn = null
                    }
                }
            ],
            { cancelable: false }
            ) 
    }
    
    //grabs location data (long/lat) from MapSearch component and updates screenPosition
    myCallback(data){
        radiusMarker = null
        
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
                        />;
        
        setRadiusBtn =  <Button
                            style = {styles.setRadiusBtn}
                            title='Set Radius'
                            color='green'
                            onPress={this.setRadius}
                        />;  
    }
    
    onLongPress(data){
        if(targetMarker != null){
            targetMarker = null; 
            radiusMarker = null;
            this.props.toggleSetupWindow(false);
        }
        
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
                            title='Set Radius'
                            color='green'
                            onPress={this.setRadius}
                        />; 

        removePinBtn =  <Button
                            title='RemovePin'
                            color='orangered'
                            onPress={this.onPressPinRemover}
                        />;
    }
    
    onPressPinRemover(){
        if(targetMarker != null){
            targetMarker = null;  
            setRadiusBtn = null;
            removePinBtn = null;
            radiusMarker = null;
            this.props.toggleSetupWindow(false);
        }
    }
           
    setRadius(){
        this.props.toggleSetupWindow(true)
        
        radiusMarker =  <MapView.Circle 
                            center={{latitude: this.state.targetMarkerPosition.latitude, longitude: this.state.targetMarkerPosition.longitude}}
                            radius={this.props.sliderValue}
                            zIndex={this.state.circleIndex}
                            fillColor='lightgreen'
                        />
                                
        setRadiusBtn = null
        removePinBtn = null
    }
    
    //checks whether or not you're editing text input
    editingInput(data){
        this.setState({
            editingInput: data
        })   
    }
    
    componentWillUnmount(){
        this.clearRefresh()
    }

   

//-------------------------------------------------------------------------

    render() {
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
                    onPress={this.onPressPinRemover}
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
				<HamburgerBtn hamburgerFunction={this.props.hamburgerFunction} />
                <MapSearch callbackFromParent={this.myCallback} 
                    clear={this.clearRefresh}
                    make={this.locRefresh}
                    giveLocation={this.state.locationMarkerPosition}
                    editingInput={this.editingInput}
                />
                {setRadiusBtn}
                {removePinBtn}
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
    }
});

export default Map;