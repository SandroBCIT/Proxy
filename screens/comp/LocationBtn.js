import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';

class LocationBtn extends Component {
	
	componentWillMount() {
        this.animatedPosition = new Animated.Value(0);
        this.animatedOpacity = new Animated.Value(0);
    }
    
    componentDidMount() {
        Animated.spring(this.animatedPosition, {
            toValue: 1,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 150
        }).start()
    }
	
//-------------------------------------------------------------------------    

    render() {
		const animatedStyle = {
            transform: [{scale: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
		
        return (
            <Animated.View style={[styles.wrapper, styles.shadowBig, animatedStyle]}>
                <TouchableOpacity style={styles.touchableArea} onPress={this.props.setToFollowLoc}>
					<Image 
						style={styles.arrow}
						source={require('../../img/location-arrow.png')}
					/>
                </TouchableOpacity>
            </Animated.View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
        top: 80,
		left: 13,
        backgroundColor: '#5CB487',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	touchableArea: {
		padding: 10,
		borderRadius: 100
	},
    arrow: {
        width: 20,
		height:20
    },
    shadowBig: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,  
    },
    shadowSm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,
    },
    btnLabel: {
        color: '#E9E9E9'
    }
});

export default LocationBtn;