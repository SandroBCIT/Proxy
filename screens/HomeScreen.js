import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Map from './comp/Map';
import HamburgerBtn from './comp/HamburgerBtn';
import MapSearch from './comp/MapSearch';

//AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0

class HomeScreen extends Component {
    constructor(props){
        super(props);
        
        this.hamburgerFunction = this.hamburgerFunction.bind(this);
//        this.storeSearch = this.storeSearch.bind(this);
    }
    
    hamburgerFunction(){
        this.props.navigation.navigate('DrawerOpen');      
    }
    
//    storeSearch(text){
//        const mapSearch = text;
//        
//        this.setState({
//            mapSearch:mapSearch    
//        });
//    }
    

//-------------------------------------------------------------------------
    
    render() {
        return (
            <View style={styles.viewContainer}>
                <Map />
                <HamburgerBtn whatToDo={this.hamburgerFunction} />
                <MapSearch />
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        alignContent: 'flex-start',
        marginTop: 24,
    },
});

export default HomeScreen;