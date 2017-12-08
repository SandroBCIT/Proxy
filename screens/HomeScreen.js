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
            checkDistance: false,
            sliderValue: 50,
            removeOldPin: false,
            disableFunctions: false
        }
    }
	
	componentWillMount() {        
		this.animatedScale = new Animated.Value(1.1);
        this.animatedOpacity = new Animated.Value(0);
	}
	
	componentDidMount() {
        this.animateIn();
    }
    
    hamburgerFunction = ()=>{
        this.props.navigation.navigate('DrawerOpen');
		this.props.screenProps.toggleDrawer();
    }
    
    setSliderValue = (data)=>{
        this.setState({
            sliderValue: data
        })
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
            this.stopCheckDistance(false)
        }
    }
    
    startCheckDistance = (data)=>{
        this.setState({
            checkDistance: data
        }) 
    }
    
    stopCheckDistance = (data)=>{
        this.setState({
            checkDistance: data
        })      
    }
    
    disableFunctions = (data)=>{
        this.setState({
            disableFunctions: data
        })    
    }
    
    disableFunctionsRemote = (data)=>{
        this.setState({
            disableFunctions: data
        })    
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
        this.setState({
            alertMethod: data
        }) 
    }
	
	animateOut = () => {
        Animated.timing(this.animatedScale, {
            toValue: 1.1,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 0.9,
            duration: 150
        }).start()
    }
	
	animateIn = () => {
        Animated.timing(this.animatedScale, {
            toValue: 1,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 150
        }).start()
    }
	
//-------------------------------------------------------------------------
    
    render() {
		
		const animatedStyle = {
            transform: [{scale: this.animatedScale}],
            opacity: this.animatedOpacity
        }
		
		if (this.props.screenProps.drawerOpen === true) {
			this.animateOut();
		} else if (this.props.screenProps.drawerOpen === false) {
			this.animateIn();
		}
		
		let progWindow = null;
		
		if (this.state.showInitialWindow === true) {
			progWindow = 
                <InitialWindow 
                    toggleInitialWindow={this.toggleInitialWindow}
                    toggleSetupWindow={this.toggleSetupWindow}
                    delayedRadius={this.delayedRadius}
                    alertMethod={this.alertMethod}
					nightMode={this.props.screenProps.nightMode}
					palette={this.props.screenProps.palette}
                />
		} else if(this.state.showSetupWindow === true){
            progWindow = 
                <SetupWindow 
                    sliderValue={this.setSliderValue} 
                    checkDistance={this.startCheckDistance}
                    toggleSetupWindow={this.toggleSetupWindow}
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.disableFunctions}
					nightMode={this.props.screenProps.nightMode}
					palette={this.props.screenProps.palette}
                />  
        } else if(this.state.showRunningWindow === true){
            progWindow =   
                <RunningWindow
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.disableFunctions}
                    removeOldPin={this.removeOldPin}
					nightMode={this.props.screenProps.nightMode}
					palette={this.props.screenProps.palette}
                />   
        }
        
        return (
            <Animated.View style={[styles.viewContainer, animatedStyle]}>
                <Map 
                    hamburgerFunction={this.hamburgerFunction} 
                    sliderValue={this.state.sliderValue} 
                    toggleInitialWindow={this.toggleInitialWindow} 
                    toggleSetupWindow={this.toggleSetupWindow} 
                    checkDistance={this.state.checkDistance} 
                    stopCheckDistance={this.stopCheckDistance}
                    removeOldPin={this.state.removeOldPin}
                    removeRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.state.disableFunctions}
                    disableFunctionsRemote={this.disableFunctionsRemote}
                    delayedRadius={this.state.delayedRadius}
                    alertMethod={this.state.alertMethod}
            
                    screenPosition={this.props.screenProps.setScreenPosition}
                    locationMarkerPosition={this.props.screenProps.setLocationMarkerPosition}
                    onRegionChange={this.props.screenProps.onRegionChange}
					nightMode={this.props.screenProps.nightMode}
					palette={this.props.screenProps.palette}
                />
                {progWindow}
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