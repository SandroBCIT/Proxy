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
                    checkDistance={this.startCheckDistance}
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
                />   
        }else if(this.state.showSetupWindow === false){
            runningWindow = null  
        }
        
        //
        
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
        marginTop: 24,
    },
});

export default HomeScreen;