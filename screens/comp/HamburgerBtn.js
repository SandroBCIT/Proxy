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
                onPress={this.props.whatToDo} 
                style={{margin: 10, width: 40, height: 40}}
                underlayColor='rgba(0,0,0,0)'>

                <Image
                    source={require('../../img/hamburger.png')}
                    style={{width: 40, height: 40}}
                />
            </TouchableHighlight>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    hamburgerBtn: {
        left: 0,
        top: 0,
        position: 'absolute',
    }
});

export default HamburgerBtn;