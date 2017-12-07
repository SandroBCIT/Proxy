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
                onPress={()=>{this.props.hamburgerFunction(); this.props.onMapPress();}}
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
        width: 40, 
        height: 40,
		paddingVertical: 10
    },
	hamburgerBtn: {
		width: 27,
		height: 25
	},
});

export default HamburgerBtn;