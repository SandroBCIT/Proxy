import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Dimensions, TouchableHighlight, Image } from 'react-native';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const {width,height} = Dimensions.get('window')
const SCREENHEIGHT = height
const SCREENWIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

var info = null;

class MapSearch extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            pred:[],
            result: null
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
    
/*    
Key 1 AIzaSyAO_IeKD3FDszoc7l_A8YM75Bysg9kGAA0
Key 2 AIzaSyBjEiGy7jQS5-cbSq-tDNFf13FrNv1JfFA
Key 3 AIzaSyAu3ShnmVH8efPc5SHgGfma4m2nldE7zeQ
Key 4 AIzaSyBoPrbvYwiaG7VqcJtOdOqKaQ5XVtBshQE
Key 5 AIzaSyDvA7eLP-6LOyqT5lBQskben8RLY0DtePc
Key 6 AIzaSyBLG_bM61CrLjp4o-pXXni9bBoP8k3d35s
Key 7 AIzaSyDWZ0_MFt-ke2vxJTYjlLLZdGjIdyZnpfQ
*/
    
    fetchPlace(text){
        fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDWZ0_MFt-ke2vxJTYjlLLZdGjIdyZnpfQ&location=49.267656, -122.988686&radius=1000&input='+text).then((resp)=>{
            return resp.json();
        }).then((json)=>{
            this.setState({
                pred: json.predictions
            })
        });
    }
   
    searchResultFunc(info){
            console.log(info);
//        fetch("https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBLG_bM61CrLjp4o-pXXni9bBoP8k3d35s&placeid="+info).then((resp)=>{
//            return resp.json();        
//        }).then((json)=>{
//                alert(json.result.geometry.location.lat);
//            this.setState({
//                result: json.result.geometry.location.lat
//            })
//        });              
    }   
  
//------------------------------------------------------------------------- 
    
    render() {
        var allDesc = this.state.pred.map((obj,i)=>{
            return (
                <Button 
                    key={i}
                    title={obj.description}
                    onPress={this.searchResultFunc.bind(this, obj[i].place_id)}
                />
            );
        });

        return (
            <View style={styles.mapSearch}>
                <View style={styles.inputContainer}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder="Where do you want to go?"
                        onChangeText={this.fetchPlace}
                    />
                </View>
                <View style={styles.suggContainer}>
                    {allDesc}
                </View>
            </View>
        );                             
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    mapSearch: {
		flexDirection: 'column',
        alignItems: 'flex-end',
		marginTop: 20,
        marginRight: 20,
        height: 50,
        width: '100%'
    },
    inputContainer: {
        height: '100%',
        width: '70%',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 10,
        marginRight: 20
    },
    suggContainer: {
        height: '100%',
        width: '70%', 
        marginRight: 20,  
    }
})

export default MapSearch;