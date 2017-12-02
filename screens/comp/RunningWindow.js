import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';

class RunningWind extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        }
        this.toggleRunningWindow = this.toggleRunningWindow.bind(this);
    }
    
    toggleRunningWindow(){
        this.props.toggleRunningWindow(false)
        this.props.disableFunctions(false)
        this.props.removeOldPin(true)
        setTimeout(()=>{   
            this.props.removeOldPin(false)
        }, 50)
    }
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={this.toggleRunningWindow}>
                    <View style={[styles.cancelBut, styles.shadowSm]}>
                        <Text style={[styles.baseText, styles.btnLabel]}>cancel</Text>	
                    </View>
                </TouchableOpacity>
            </View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
	viewContainer: {
		position: 'absolute',
        bottom: '5%',
        width: '100%'
	},
    baseText: {
        fontFamily: 'open-sans-light'
    },
    wrapper: {
        
    },
    slider: {
        marginTop: '5%'    
    },
    text: {
        textAlign: 'center'
    },
    shadowSm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        elevation: 2,
    },
    cancelBut: {
        height: 35,
        width:'70%',
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

export default RunningWind;