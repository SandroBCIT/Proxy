import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Slider, TouchableOpacity } from 'react-native';

class InitialWindow extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        }
    }
    
    setToAlarm = ()=>{
        this.setState({
            myMethod: 1
        })   
        this.toggleWindow()
    }
    
    setToNotification = ()=>{
        this.setState({
            myMethod: 2
        })  
        this.toggleWindow()
    }
    
    setToMessage = ()=>{
        this.setState({
            myMethod: 3
        })  
        this.toggleWindow()
    }
    
    toggleWindow = ()=>{
        this.props.toggleInitialWindow(false)
        this.props.toggleSetupWindow(true)
        this.props.disableFunctions(true)
        //to show radius in map component
        this.props.delayedRadius(true)
        setTimeout(()=>{   
            this.props.delayedRadius(false)
        }, 50)
    }
    
    
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={[styles.wrapper, styles.shadowBig]}>
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
                    <TouchableOpacity onPress={this.setToMessage}>
                        <View style={[styles.confirmBut, styles.shadowSm]}>
                            <Text style={[styles.baseText, styles.btnLabel]}>message</Text>	
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
    baseText: {
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

export default InitialWindow;