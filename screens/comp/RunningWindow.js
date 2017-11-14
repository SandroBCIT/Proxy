import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

class RunningWind extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        }
        this.toggleRunningWindow = this.toggleRunningWindow.bind(this);
    }
    
    toggleRunningWindow(){
        this.props.toggleRunningWindow(false);
    }
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.wrapper}>
                    <Button 
                        title = 'Cancel'
                        onPress = {this.toggleRunningWindow}
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

export default RunningWind;