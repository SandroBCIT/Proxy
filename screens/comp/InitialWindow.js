import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity, Animated, Easing } from 'react-native'

class InitialWindow extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
			palette: this.props.palette
        }
    }
    
    componentWillMount() {
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
	
    setToAlarm = ()=>{
        this.toggleWindow()
        this.props.alertMethod(1)
    }
    
    setToNotification = ()=>{ 
        this.toggleWindow()
        this.props.alertMethod(2)
    }
    
    toggleWindow = ()=>{
        this.props.toggleInitialWindow(false)
        this.props.toggleSetupWindow(true)
        //to show radius in map component
        this.props.delayedRadius(true)
        setTimeout(()=>{   
            this.props.delayedRadius(false)
        }, 50)
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
                <Animated.View style={[styles.wrapper, styles.shadow, {backgroundColor: colPal.butText}, animatedStyle]}>
                    <Text style={[styles.baseText, {color: colPal.primaryBut}, styles.heading]}>choose your action</Text>
                    <TouchableOpacity onPress={this.setToAlarm}>
                        <View style={[styles.confirmBut, {backgroundColor: colPal.primaryBut}, styles.shadow]}>
                            <Text style={[styles.baseText, {color: colPal.butText}, styles.btnLabel]}>alarm</Text>	
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setToNotification}>
                        <View style={[styles.confirmBut, {backgroundColor: colPal.primaryBut}, styles.shadow]}>
                            <Text style={[styles.baseText, {color: colPal.butText}]}>notification</Text>
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
        paddingTop: 15,
        paddingBottom: 5
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,
    },
    baseText: {
        textAlign: 'center',
        fontFamily: 'open-sans-light'
    },
	heading: {
		marginBottom: 10
	},
    confirmBut: {
        height: 35,
        width:'80%',
		justifyContent: 'center',
		alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    }
});

export default InitialWindow;