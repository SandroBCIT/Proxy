import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Animated } from 'react-native';

class RunningWind extends Component {
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
    
    toggleRunningWindow = () => {
        this.props.toggleRunningWindow(false)
        this.props.disableFunctions(false)
        this.props.removeOldPin(true)
        setTimeout(()=>{   
            this.props.removeOldPin(false)
        }, 50)
    }
//-------------------------------------------------------------------------    

    render() {
		const animatedStyle = {
            transform: [{translateY: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
		
        return (
            <Animated.View style={[styles.wrapper, styles.shadowBig, animatedStyle]}>
				<Text style={styles.baseText}>enjoy your trip!</Text>
                <TouchableOpacity onPress={this.toggleRunningWindow}>
                    <View style={[styles.cancelBut, styles.shadowSm]}>
                        <Text style={[styles.baseText, styles.btnLabel]}>cancel</Text>
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
        width: '60%',
        backgroundColor: '#E9E9E9',
        paddingTop: 15,
        paddingBottom: 5
	},
    baseText: {
        fontFamily: 'open-sans-light',
		textAlign: 'center',
		color: "#58378F"
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
    cancelBut: {
        height: 35,
        width:'80%',
		justifyContent: 'center',
		alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#58378F',
		marginTop: 20,
        marginBottom: 10,
    },
    btnLabel: {
        color: '#E9E9E9'
    }
});

export default RunningWind;