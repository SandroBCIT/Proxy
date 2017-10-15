import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class MapSearch extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            info: ''   
        }
    }

//-------------------------------------------------------------------------    

    render() {
        return (
            <View style={styles.mapSearch}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} 
                    autoFocus={false}
                    returnKeyType={'search'} 
                    listViewDisplayed='auto'  
                    fetchDetails={true}
                    renderDescription={row => row.description} 

                    onPress={(data, details = null) => {

                        var obj = Object.keys(details);
                        var info = JSON.stringify(details['geometry']['location']['lat']);

                        this.setState({
                            info:info    
                        });
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        key: 'AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0',
                        language: 'en'
                    }}

                    styles={{
                        textInputContainer: {backgroundColor: 'white', borderRadius: 10},
                        description: {fontWeight: 'bold'},
                        predefinedPlacesDescription: {color: '#1faadb'},
                        listView: {backgroundColor: 'white', borderRadius: 10}
                    }}

                    nearbyPlacesAPI='GooglePlacesSearch' 
                    GoogleReverseGeocodingQuery={{
                    }}
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
        flex: 1,
        alignSelf: 'flex-end',
        height: '10%',
        width: '80%',
        marginTop: 5,
        marginRight: 10
    }
});

export default MapSearch;