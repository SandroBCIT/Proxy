import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity, Animated, Easing } from 'react-native'

class InitialWindow extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
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
        
        return (
                <Animated.View style={[styles.wrapper, styles.shadow, animatedStyle]}>
                    <Text style={[styles.baseText, styles.heading]}>choose your action</Text>
                    <TouchableOpacity onPress={this.setToAlarm}>
                        <View style={[styles.confirmBut, styles.shadow]}>
                            <Text style={[styles.baseText, styles.btnLabel]}>alarm</Text>	
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setToNotification}>
                        <View style={[styles.confirmBut, styles.shadow]}>
                            <Text style={[styles.baseText, styles.btnLabel]}>notification</Text>	
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
        backgroundColor: '#58378F',
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
        color: 'white',
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
        backgroundColor: 'white',
        marginVertical: 10,
    },
    btnLabel: {
        color: '#58378F'
    }
});

export default InitialWindow;