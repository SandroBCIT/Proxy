import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, TextInput } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import Map from './comp/Map'
import HamburgerBtn from './comp/HamburgerBtn'
import SetupWindow from './comp/SetupWindow'
import RunningWindow from './comp/RunningWindow'
import InitialWindow from './comp/InitialWindow'

//AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0

class HomeScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showSetupWindow: false,
            checkDistance: false,
            sliderValue: 50,
            removeOldPin: false
        }
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
            this.stopCheckDistance(false);
            this.setState({
                removeOldPin: true
            })
            //to prevent perma removal of future pins
            setTimeout(()=>{
                this.setState({
                    removeOldPin: false
                })        
            }, 50)
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
    
    delayedRadius = (data)=>{
        this.setState({
            delayedRadius: data
        })
    }
//-------------------------------------------------------------------------
    
    render() {
        var initialWindow = null;
        if(this.state.showInitialWindow === true){
            initialWindow = 
                <InitialWindow 
                    toggleInitialWindow={this.toggleInitialWindow}
                    toggleSetupWindow={this.toggleSetupWindow}
                    disableFunctions={this.disableFunctions}
                    delayedRadius={this.delayedRadius}
                />   
        }else if(this.state.showInitialWindow === false){
            initialWindow = null;  
        }
        
        var setupWindow = null;
        if(this.state.showSetupWindow === true){
            setupWindow = 
                <SetupWindow 
                    sliderValue={this.setSliderValue} 
                    checkDistance={this.startCheckDistance}
                    toggleSetupWindow={this.toggleSetupWindow}
                    toggleRunningWindow={this.toggleRunningWindow}
                />  
        }else if(this.state.showSetupWindow === false){
            setupWindow = null  
        }
        
        var runningWindow = null
        if(this.state.showRunningWindow === true){
            runningWindow =   
                <RunningWindow
                    toggleRunningWindow={this.toggleRunningWindow}
                    disableFunctions={this.disableFunctions}
                />   
        }else if(this.state.showSetupWindow === false){
            runningWindow = null  
        }
        
        return (
            <View style={styles.viewContainer}>
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
                    delayedRadius={this.state.delayedRadius}
                />
                {initialWindow}
                {setupWindow}
                {runningWindow}
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        alignContent: 'flex-start',
        marginTop: 24,
    },
});

export default HomeScreen;