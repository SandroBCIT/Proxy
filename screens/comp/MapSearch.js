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
				<TouchableHighlight 
					onPress={this.props.hamburgerFunction} 
					
				>
					<Image
						source={require('../../img/icon-p-menu.png')}
						style={styles.hamburgerBtn}
					/>
				</TouchableHighlight>
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

                    styles={{
                        textInputContainer: {backgroundColor: 'white', marginRight: 20, borderRadius: 5},
                        description: {fontWeight: 'bold'},
                        predefinedPlacesDescription: {color: '#1faadb'},
                        listView: {backgroundColor: 'white', borderRadius: 10},
                        poweredContainer: {display: 'none'}
                    }}

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
		alignItems: 'center',
		marginTop: 20
    },
	hamburgerBtn: {
		width: 22,
		height: 20,
		marginHorizontal: 20
	}
});

export default MapSearch;