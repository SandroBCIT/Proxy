import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableHighlight, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapSearch extends Component {
    
    constructor(props){
        super(props);
        
        this.state = { 
        }
    }
    
    
    
//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.mapSearch}>
                <GooglePlacesAutocomplete
                    
                    placeholder='where are you going?'
                    minLength={2} 
                    autoFocus={false}
                    returnKeyType={'search'} 
                    listViewDisplayed='auto'  
                    fetchDetails={true}
                    renderDescription={row => row.description} 
            
                    //custom props
                    giveLocation={this.props.giveLocation}
                    blurProp={this.props.blurProp}
                    resetBlurProp={this.props.resetBlurProp}
                    stopRefresh={this.props.stopRefresh}
                    startRefresh={this.props.startRefresh}
                
                    onPress={(data, details = null) => {
            
                        this.props.stopRefresh;

                        var obj = Object.keys(details);
                        var lat = JSON.stringify(details['geometry']['location']['lat']);
                        var long = JSON.stringify(details['geometry']['location']['lng']);
                           
                        var searchResult = {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        }                
            
                        this.setState({
                            searchResult:searchResult
                        });
            
                        this.props.callbackFromParent(this.state.searchResult);
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        key: 'AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0',
                        language: 'en'
                    }}

                    styles={searchStyles}

                    nearbyPlacesAPI='GooglePlacesSearch' 
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}

                    debounce={200} 
                />
            </View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    mapSearch: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 20,
        marginLeft: '18%'
    },
	hamburgerBtn: {
		width: 27,
		height: 25,
		marginHorizontal: 20,
		marginTop: 10
	}
});

const searchStyles = {
    textInputContainer: {
        backgroundColor: 'white',
        marginRight: 20,
        borderRadius: 5,
        height: 45,
        borderWidth: 1,
        borderColor: '#58378F'
    },
    predefinedPlacesDescription: { color: '#1faadb' },
    listView: {
        backgroundColor: 'white',
        marginRight: 20,
        paddingRight: 20
    },
    poweredContainer: { display: 'none' }
}

export default MapSearch;