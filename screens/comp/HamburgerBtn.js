import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';

class HamburgerBtn extends Component {
    constructor(props){
        super(props);
    }
    
//-------------------------------------------------------------------------
    
    render() {
        return (
            <TouchableHighlight 
                style= {styles.hamburgerBtnCont}
                onPress={this.props.whatToDo} 
                underlayColor='rgba(0,0,0,0)'>

                <Image
                    source={require('../../img/icon-p-menu.png')}
                    style={styles.hamburgerBtn}
                />
            </TouchableHighlight>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    hamburgerBtnCont: { 
        position: 'absolute',
        top: 5,
        left: 5,
        width: 40, 
        height: 40   
    },
	hamburgerBtn: {
		width: 40,
		height: 40
	}
});

export default HamburgerBtn;