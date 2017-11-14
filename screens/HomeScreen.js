import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Map from './comp/Map';
import HamburgerBtn from './comp/HamburgerBtn';
import SetupWindow from './comp/SetupWindow';
import RunningWindow from './comp/RunningWindow';

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
        
        this.hamburgerFunction = this.hamburgerFunction.bind(this);
        this.setSliderValue = this.setSliderValue.bind(this);
        this.toggleSetupWindow = this.toggleSetupWindow.bind(this);
        this.toggleRunningWindow = this.toggleRunningWindow.bind(this);
        this.startCheckDistance = this.startCheckDistance.bind(this);
        this.stopCheckDistance = this.stopCheckDistance.bind(this);
    }
    
    hamburgerFunction(){
        this.props.navigation.navigate('DrawerOpen');      
    }
    
    setSliderValue(data){
        this.setState({
            sliderValue: data
        })
    }
    
    toggleSetupWindow(data){
        this.setState({
            showSetupWindow: data
        })
    }
    
    toggleRunningWindow(data){
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
    
    startCheckDistance(data){
        this.setState({
            checkDistance: data
        }) 
    }
    
    stopCheckDistance(data){
        this.setState({
            checkDistance: data
        })      
    }
//-------------------------------------------------------------------------
    
    render() {
        var setupWind = null;
        if(this.state.showSetupWindow === true){
            setupWind = <SetupWindow 
                            sliderValue={this.setSliderValue} 
                            checkDistance={this.startCheckDistance}
                            toggleSetupWindow={this.toggleSetupWindow}
                            toggleRunningWindow={this.toggleRunningWindow}
                        />;   
        }else if(this.state.showSetupWindow === false){
            setupWind = null;  
        }
        
        var runningWind = null;
        if(this.state.showRunningWindow === true){
            runningWind =   <RunningWindow
                                toggleRunningWindow={this.toggleRunningWindow}             
                            />;   
        }else if(this.state.showSetupWindow === false){
            runningWind = null;  
        }
        
        return (
            <View style={styles.viewContainer}>
                <Map 
                    hamburgerFunction={this.hamburgerFunction} 
                    sliderValue={this.state.sliderValue} 
                    toggleSetupWindow={this.toggleSetupWindow} 
                    checkDistance={this.state.checkDistance} 
                    stopCheckDistance={this.stopCheckDistance}
                    removeOldPin={this.state.removeOldPin}
                    removeRunningWindow={this.toggleRunningWindow}
                />
                {setupWind}
                {runningWind}
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