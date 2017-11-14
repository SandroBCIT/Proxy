import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Slider } from 'react-native';


class SetupWindow extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            sliderValue: 50
        }
        this.returnSliderValue = this.returnSliderValue.bind(this);
        this.startCheckDistance = this.startCheckDistance.bind(this);
    }
    
    componentWillMount(){
        this.props.sliderValue(this.state.sliderValue); 
    }
    
    returnSliderValue(data){
        this.setState({
            sliderValue: data     
        })
        this.props.sliderValue(data);
    }
    
    startCheckDistance(){
        this.props.checkDistance(true);
        this.props.toggleSetupWindow(false);
        this.props.toggleRunningWindow(true);
    }
    
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.wrapper}>
                    <Slider
                        style={styles.slider}
                        minimumTrackTintColor = 'green'
                        maximumValue = {100}
                        onValueChange = {this.returnSliderValue}
                        value = {50}
                        step = {10}
                    />  
                    <Text style={styles.text}>
                        {this.state.sliderValue} m
                    </Text>
                    <Button 
                        title = 'GO'
                        onPress = {this.startCheckDistance}
                    />
                </View>
            </View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
	viewContainer: {
		position: 'absolute',
        left: '50%',
        top: '80%',
	},
    wrapper: {
        position: 'relative',
        left: '-50%',
        top: '-50%',
        height: 100,
        width: 300,
        backgroundColor: 'lightgray'
    },
    slider: {
        marginTop: '5%'    
    },
    text: {
        textAlign: 'center'
    }
});

export default SetupWindow;