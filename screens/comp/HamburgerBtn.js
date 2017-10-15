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
                style= {styles.hamburerBtn}
                onPress={this.props.whatToDo} 
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
    hamburerBtn: { 
        position: 'absolute',
        top: 5,
        left: 5,
        width: 40, 
        height: 40   
    },
});

export default HamburgerBtn;