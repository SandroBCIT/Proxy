import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Dimensions, Alert, View, Text, Button, Vibration, TouchableOpacity, Animated, UIManager, Platform } from 'react-native';
import MapSearch from './MapSearch';
import HamburgerBtn from './HamburgerBtn';
import LocationBtn from './LocationBtn';
import LogoAnim from './LogoAnim';
import LightMap from '../../assets/maps/light.json'
import DarkMap from '../../assets/maps/dark.json'

const {width,height} = Dimensions.get('window');
const SCREENHEIGHT = height;
const SCREENWIDTH = width;
const ASPECT_RATIO = width / height;
//Zoom lvl
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var targetMarker = null;
var radiusCircle = null;
var removePinBtn = null;
var longPressLat = null;
var longPressLong = null;

class Map extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            circleIndex: 9999,
        }
		
		if (Platform.OS === 'android') {
		  UIManager.setLayoutAnimationEnabledExperimental(true)
		}
		
		console.log(this.props.screenPosition)
    }
    
    //grabs location data (long/lat) from MapSearch component and updates screenPosition
    mapSearchFunc = (data)=>{
        //removes preexisting target marker and circle radius
        if(this.state.showTargetMarker === true){ 
            this.setState({
                showTargetMarker: false,
                showRadiusCircle: false
            })
            this.props.toggleInitialWindow(false)
            this.props.toggleSetupWindow(false)
        }
        
        //updates new target marker and circle radius location
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
        
        this.props.searchLocation(searchLocation);
        
        //displays target marker and circle radius
        this.setState({
            showTargetMarker: true
        })
        this.props.toggleInitialWindow(true);
         
    }
    
    //when long pressing map 
    onLongPress = (data)=>{
        if(this.props.disableFunctions === false){
            //removes pre-existing marker & circle
            if(this.state.showTargetMarker === true){ 
                this.setState({
                    showTargetMarker: false,
                    showRadiusCircle: false
                })
                this.props.toggleInitialWindow(false)
                this.props.toggleSetupWindow(false)
            }

            //grabs details about where the map is pressed on
            longPressLat = parseFloat(JSON.stringify(data.nativeEvent.coordinate['latitude']));
            longPressLong = parseFloat(JSON.stringify(data.nativeEvent.coordinate['longitude']));
            var newTargetMarker = {
                latitude: longPressLat,
                longitude: longPressLong,   
            }
            
            this.props.onMapLongPress(newTargetMarker);

            //displays target marker, radius circle and initial window
            this.setState({
                showTargetMarker: true
            })
            this.props.toggleInitialWindow(true)
        }
    }
    
    //when tapping on map
    onMapPress = () => {
        if(this.props.disableFunctions === false){
            if(this.state.showTargetMarker === true){
                this.setState({
                    showTargetMarker: false,
                    showRadiusCircle: false
                })
                this.props.toggleInitialWindow(false)
                this.props.toggleSetupWindow(false)
            }

            //unfocuses from the map search & removes search suggestions
            this.setState({
                blurProp: true
            })
        }
    }
	
	hamburgerFunction = () => {
		this.onMapPress();
		this.props.hamburgerFunction();
	}
    
    resetBlurProp = (data)=>{
        this.setState({
            blurProp: data
        })   
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.delayedRadius === true){
            this.setState({
                showRadiusCircle: true
            })
        }
        if(nextProps.removeOldPin === true){
            this.setState({
                showTargetMarker: false,
                showRadiusCircle: false
            }); 
        }
        if(nextProps.showTargetMarkerRemote === false){
            this.setState({
                showTargetMarker: false
            })    
        }
        if(nextProps.showRadiusCircleRemote === false){
            this.setState({
                showRadiusCircle: false
            })    
        }        
    }

//-------------------------------------------------------------------------

    render() {
		
		
        //Target Marker
        let targetMarker = null
        if(this.state.showTargetMarker === true){
            targetMarker = 
                <MapView.Marker 
                    coordinate={this.props.targetMarkerPosition}
                    image={require("../../img/pin-01.png")}
                />
        }else if(this.state.showTargetMarker === false){
            targetMarker = null   
        }
        
        //Radius Circle
        let radiusCircle =  null
        if(this.state.showRadiusCircle === true){
            radiusCircle = 
                <MapView.Circle 
                    center={this.props.targetMarkerPosition}
                    radius={this.props.sliderValue}
                    zIndex={this.state.circleIndex}
                    fillColor='rgba(88,55,143,0.3)'
                    strokeWidth={0}
                />
        }else if(this.state.showRadiusCircle === false){
            radiusCircle = null   
        }

        //Search Active Background View
        let bgView = null;
        if (this.state.searchActive === true) {
            bgView =    <TouchableOpacity
                            style={styles.searchEscView}
                            onPress={this.searchInactive}
                        />;
        } else {
            bgView = null;
        }

        //Follow Btn
        let followLocBtn = null;
        if (this.props.showFollowLocBtn === true) {
            followLocBtn = 
			<LocationBtn
				setToFollowLoc={this.props.setToFollowLoc}
			/>;
        } else {
            followLocBtn = null;
        }

		// Night Mode

		let 
			curMapStyle = null;

		if (this.props.nightMode === true) {
			curMapStyle = DarkMap;
		} else {
			curMapStyle = LightMap;
		}

		return (
			<View style={styles.viewContainer} key={this.props.nightMode}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					customMapStyle={curMapStyle}
					region={this.props.screenPosition}
					onRegionChange={(region)=>{
				        this.props.onRegionChange(region)
					}}
					rotateEnabled={false}
					loadingEnabled={true}
					onLongPress={(data) => this.onLongPress(data)}
					onPress={this.onMapPress}
				>

					{radiusCircle}
					{targetMarker}

					<MapView.Marker 
						coordinate={this.props.locationMarkerPosition}
						anchor={{ x: 0.5, y: 0.5 }}
					>
							<LogoAnim nightMode={this.props.nightMode} palette={this.props.palette} />
					</MapView.Marker>
				</MapView>
				{bgView}
				<View style={styles.header}>
					
					<MapSearch 
						callbackFromParent={this.mapSearchFunc} 
						giveLocation={this.props.locationMarkerPosition}
						editingInput={this.editingInput}
						blurProp={this.state.blurProp}
						resetBlurProp={this.resetBlurProp}
						hamburgerFunction={this.hamburgerFunction}
						onMapPress={this.onMapPress}
						nightMode={this.props.nightMode}
					/>

				</View>
				{followLocBtn}
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
	anim: {
		height: 200,
		width: 200,
		backgroundColor: 'red',
	},
	header: {
		
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
    },
    followLocBtn: {
        alignSelf: 'flex-end'
    }
});

export default Map;