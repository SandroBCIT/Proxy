import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';

class HamburgerBtn extends Component {
    constructor(props){
        super(props);
    }
    
//-------------------------------------------------------------------------
    
    render() {
		let btnSrc = require('../../img/icon-p-menu.png');
		
		if (this.props.nightMode === true) {
			btnSrc = require('../../img/icon-g-menu.png')
		}
		
        return (
            <TouchableHighlight 
                style={styles.hamburgerBtnCont}
                onPress={this.props.hamburgerFunction}>

                <Image
                    source={btnSrc}
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