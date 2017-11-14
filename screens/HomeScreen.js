import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Map from './comp/Map';
import HamburgerBtn from './comp/HamburgerBtn';
import SetupWindow from './comp/SetupWindow';

//AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0

class HomeScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showSetupWindow: false,
            checkDistance: false,
            sliderValue: 1000
        }
        
        this.hamburgerFunction = this.hamburgerFunction.bind(this);
        this.setSliderValue = this.setSliderValue.bind(this);
        this.toggleSetupWindow = this.toggleSetupWindow.bind(this);
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
        var comp = null;
        if(this.state.showSetupWindow === true){
            comp = <SetupWindow sliderValue={this.setSliderValue} checkDistance={this.startCheckDistance} />;   
        }else if(this.state.showSetupWindow === false){
            comp = null;  
        }
        
        return (
            <View style={styles.viewContainer}>
                <Map hamburgerFunction={this.hamburgerFunction} sliderValue={this.state.sliderValue} toggleSetupWindow={this.toggleSetupWindow} checkDistance={this.state.checkDistance} stopCheckDistance={this.stopCheckDistance} />
                {comp}
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