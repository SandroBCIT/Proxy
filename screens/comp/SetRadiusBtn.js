import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';

class SetRadiusBtn extends Component {
    constructor(props){
        super(props);
        
        this.state = {    
        }
        this.setRadius = this.setRadius.bind(this);
    }
    
    setRadius(){
        alert("pressed");   
    }
//-------------------------------------------------------------------------
    
    render() {
        return (
            <Button
                style = {styles.setRadiusBtn}
                title='Set Radius'
                color='green'
                onPress={this.setRadius}
            />  
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    setRadiusBtn: {
           
    }
});

export default SetRadiusBtn;