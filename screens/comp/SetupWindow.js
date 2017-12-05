import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity, Animated } from 'react-native'


class SetupWindow extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            sliderValue: 100
        }
    }
    
    componentWillMount(){
        this.props.sliderValue(this.state.sliderValue); 
		this.animatedPosition = new Animated.Value(50);
        this.animatedOpacity = new Animated.Value(0);
    }
	
	componentDidMount() {
        Animated.timing(this.animatedPosition, {
            toValue: 0,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 150
        }).start()
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
		const animatedStyle = {
            transform: [{translateX: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
		
        return (
                <Animated.View style={[styles.wrapper, styles.shadowBig, animatedStyle]}>
                    <Slider
                        style={styles.slider}
                        minimumTrackTintColor = '#2AAE78'
                        thumbTintColor = '#2AAE78'
                        maximumValue = {1000}
                        onValueChange = {this.returnSliderValue}
                        value = {100}
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
                </Animated.View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'open-sans-light'
    },
    wrapper: {
        position: 'absolute',
		bottom: 40,
        width: '80%',
        backgroundColor: '#E9E9E9',
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