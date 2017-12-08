import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity, Animated } from 'react-native'


class SetupWindow extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            sliderValue: 100,
			palette: this.props.palette
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
		
		let colPal = this.state.palette.light;
		
		if (this.props.nightMode === true) {
			colPal = this.state.palette.dark;
		}
		
        return (
                <Animated.View style={[styles.wrapper, styles.shadowBig, {backgroundColor: colPal.butText}, animatedStyle]}>
                    <Slider
                        style={styles.slider}
                        minimumTrackTintColor = {colPal.secondary}
                        thumbTintColor = {colPal.secondary}
                        maximumValue = {1000}
                        onValueChange = {this.returnSliderValue}
                        value = {100}
                        step = {5}
                    />  
                    <Text style={[styles.baseText, {color: colPal.primaryBut}]}>
                        notify when {this.state.sliderValue} m away
                    </Text>
                    <TouchableOpacity onPress={this.startCheckDistance}>
                        <View style={[styles.confirmBut, styles.shadowSm, {backgroundColor:colPal.primaryBut}]}>
                            <Text style={[styles.baseText, {color: colPal.butText}]}>start</Text>	
                        </View>
                    </TouchableOpacity>
                </Animated.View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
		bottom: 40,
        width: '80%',
        backgroundColor: '#E9E9E9',
        paddingTop: 15,
        paddingBottom: 5
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
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,
    },
    slider: {
        marginVertical: 10,
		marginHorizontal: 20
    },
	baseText: {
		textAlign: 'center',
		color: '#58378F',
        fontFamily: 'open-sans-light'
    },
    confirmBut: {
        height: 35,
        width:'80%',
		justifyContent: 'center',
		alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#58378F',
        marginVertical: 10,
    },
    btnLabel: {
        color: '#E9E9E9'
    }
});

export default SetupWindow;