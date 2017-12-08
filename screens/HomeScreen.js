import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, Animated } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Map from './comp/Map';
import HamburgerBtn from './comp/HamburgerBtn';
import SetupWindow from './comp/SetupWindow';
import RunningWindow from './comp/RunningWindow';
import InitialWindow from './comp/InitialWindow';

//AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0

class HomeScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showSetupWindow: false,
            removeOldPin: false,
            disableFunctions: false
        }
    }
	
	componentWillMount() {        
		this.animatedPosition = new Animated.Value(50);
        this.animatedOpacity = new Animated.Value(0);
	}
	
	componentDidMount() {
        Animated.timing(this.animatedPosition, {
            toValue: 0,
            duration: 300
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 400
        }).start()
    }
    
    hamburgerFunction = ()=>{
        this.props.navigation.navigate('DrawerOpen');      
    }
    
    setSliderValue = (data)=>{
        this.props.screenProps.setSliderValue(data);
    }
    
    toggleInitialWindow = (data)=>{
        this.setState({
            showInitialWindow: data
        })
    }
    
    toggleSetupWindow = (data)=>{
        this.setState({
            showSetupWindow: data
        })
    }
    
    toggleRunningWindow = (data)=>{
        this.setState({
            showRunningWindow: data
        })  
        if(data === false){
            this.checkDistance(false)
        }
    }
    
    checkDistance = (data) => {
        this.props.screenProps.checkDistance(data)    
    }
    
    disableFunctions = (data)=>{
        this.setState({
            disableFunctions: data
        })    
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.screenProps.disableFunctionsRemote === false){
            this.setState({
                disableFunctions: false
            })    
        }
        if(nextProps.screenProps.removeRunningWindow === true){
            this.setState({
                showRunningWindow: false       
            })
        }
    }
    
    delayedRadius = (data)=>{
        this.setState({
            delayedRadius: data
        })
    }
    
    removeOldPin = (data)=>{
        this.setState({
            removeOldPin: data
        })   
    }
    
    alertMethod = (data)=>{
        this.props.screenProps.setAlertMethod(data);
    }
//-------------------------------------------------------------------------
    
    render() {
		
		const animatedStyle = {
            transform: [{translateY: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
		
        //1st
        let initialWindow = null;
        if(this.state.showInitialWindow === true){
            initialWindow = 
                <InitialWindow 
                    toggleInitialWindow={this.toggleInitialWindow}
                    toggleSetupWindow={this.toggleSetupWindow}
                    delayedRadius={this.delayedRadius}
                    alertMethod={this.alertMethod}
                />   
        }else if(this.state.showInitialWindow === false){
            initialWindow = null;  
        }
        
        //2nd
        let setupWindow = null;
        if(this.state.showSetupWindow === true){
            setupWindow = 
                <SetupWindow 
                    sliderValue={this.setSliderValue} 
                    checkDistance={this.checkDistance}
                    toggleSetupWindow={this.toggleSetupWindow}
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.disableFunctions}
                />  
        }else if(this.state.showSetupWindow === false){
            setupWindow = null  
        }
        
        //3rd
        let runningWindow = null
        if(this.state.showRunningWindow === true){
            runningWindow =   
                <RunningWindow
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.disableFunctions}
                    removeOldPin={this.removeOldPin}
                    checkDistance={this.checkDistance}
                />   
        }else if(this.state.showSetupWindow === false){
            runningWindow = null  
        }
            
        return (
            <Animated.View style={[styles.viewContainer, animatedStyle]}>
                <Map 
                    hamburgerFunction={this.hamburgerFunction} 
                    sliderValue={this.props.screenProps.sliderValue} 
                    toggleInitialWindow={this.toggleInitialWindow} 
                    toggleSetupWindow={this.toggleSetupWindow} 
                    removeOldPin={this.state.removeOldPin}
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.state.disableFunctions}
                    disableFunctionsRemote={this.disableFunctionsRemote}
                    delayedRadius={this.state.delayedRadius}
                    alertMethod={this.state.alertMethod}
            
                    screenPosition={this.props.screenProps.setScreenPosition}
                    locationMarkerPosition={this.props.screenProps.setLocationMarkerPosition}
                    targetMarkerPosition={this.props.screenProps.setTargetMarkerPosition}
                    searchLocation={this.props.screenProps.onSearchLocation}
                    onMapLongPress={this.props.screenProps.onMapLongPress}
                    onRegionChange={this.props.screenProps.onRegionChange}
            
                    showTargetMarkerRemote={this.props.screenProps.showTargetMarkerRemote}
                    showRadiusCircleRemote={this.props.screenProps.showRadiusCircleRemote}
                />
                {initialWindow}
                {setupWindow}
                {runningWindow}
            </Animated.View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'flex-start',
        marginTop: 22,
    },
});

export default HomeScreen;