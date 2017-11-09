import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Dimensions, TouchableHighlight, Image } from 'react-native';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
            pred:[]
        }
		
	   this.fetchPlace = this.fetchPlace.bind(this);
    }
    
    /*query={{
                        key: 'AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0',
                        language: 'en'
                    }}
                    
                    styles={{
                        textInputContainer: {backgroundColor: 'white', marginRight: 20, borderRadius: 5, height: 45,borderWidth: 1, borderColor: '#58378F'},
                        description: {fontWeight: 'bold'},
                        predefinedPlacesDescription: {color: '#1faadb'},
                        listView: {backgroundColor: 'white', marginRight: 20, paddingRight: 20},
                        poweredContainer: {display: 'none'}
                    }}
                    
                    onPress={(data, details = null) => {
                             console.log("Hihi");
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
            
                        this.props.callbackFromParent(searchResult);
                    }}
                    */
//-------------------------------------------------------------------------    
    fetchPlace(text){
        fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0&input="+text).then((resp)=>{
            return resp.json();
        }).then((json)=>{
            //console.log(json);
            this.setState({
                pred:json.predictions
            })
        });
    }
    render() {
        var allDesc = this.state.pred.map((obj,i)=>{
            return (
                <Button 
                    title={obj.description}
                    onPress={()=>{}}
                />
            )
        })
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
                <TextInput
                    placeholder="Where you wanna go?"
                    onChangeText={this.fetchPlace}
                />
                <View style={{flex:1, flexDirection:"column"}}>
                {allDesc}
                </View>
            </View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    mapSearch: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 20
    },
	hamburgerBtn: {
		width: 27,
		height: 25,
		marginHorizontal: 20,
		marginTop: 10
	}
});

export default MapSearch;