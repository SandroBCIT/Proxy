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
                <Animated.View style={[styles.wrapper, styles.shadowBig, animatedStyle]}>
                    <Text style={styles.baseText}>choose your action</Text>
                    <TouchableOpacity onPress={this.setToAlarm}>
                        <View style={[styles.confirmBut, styles.shadowSm]}>
                            <Text style={[styles.baseText, styles.btnLabel]}>alarm</Text>	
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setToNotification}>
                        <View style={[styles.confirmBut, styles.shadowSm]}>
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

export default InitialWindow;