import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity } from 'react-native'


class SetupWindow extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            sliderValue: 250
        }
    }
    
    componentWillMount(){
        this.props.sliderValue(this.state.sliderValue); 
    }
    
    returnSliderValue = (data)=>{
        this.setState({
            sliderValue: data     
        })
        this.props.sliderValue(data)
    }
    
    startCheckDistance = ()=>{
        this.props.checkDistance(true)
        this.props.toggleSetupWindow(false)
        this.props.toggleRunningWindow(true)
        this.props.disableFunctions(true)
    }
    
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={[styles.wrapper, styles.shadowBig]}>
                    <Slider
                        style={styles.slider}
                        minimumTrackTintColor = '#2AAE78'
                        thumbTintColor = '#2AAE78'
                        maximumValue = {500}
                        onValueChange = {this.returnSliderValue}
                        value = {250}
                        step = {5}
                    />  
                    <Text style={[styles.baseText, styles.text]}>
                        {this.state.sliderValue} m
                    </Text>
                    <TouchableOpacity onPress={this.startCheckDistance}>
                        <View style={[styles.confirmBut, styles.shadowSm]}>
                            <Text style={[styles.baseText, styles.btnLabel]}>start</Text>	
                        </View>
                    </TouchableOpacity>
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
        top: '80%'
	},
    baseText: {
        fontFamily: 'open-sans-light'
    },
    wrapper: {
        position: 'relative',
        left: '-50%',
        top: '-50%',
        width: 300,
        backgroundColor: '#E9E9E9',
        borderRadius: 5,
    },
    shadowBig: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,  
    },
    shadowSm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        elevation: 2,
    },
    slider: {
        marginVertical: 20    
    },
    text: {
        textAlign: 'center'
    },
    confirmBut: {
        height: 35,
        width:'80%',
		justifyContent: 'center',
		alignItems: 'center',
        alignSelf: 'center',
		borderRadius: 5,
        backgroundColor: '#58378F',
        marginVertical: 20,
    },
    btnLabel: {
        color: '#E9E9E9'
    }
});

export default SetupWindow;