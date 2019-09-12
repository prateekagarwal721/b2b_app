/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput,ScrollView, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,ActivityIndicator,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';


var {height, width} = Dimensions.get('window');
class Order extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'Order ',
        headerTitleStyle :{textAlign: 'center',fontSize: 16,fontWeight:'400',alignSelf:'center',color:'#11137C'},
          headerStyle:{
            backgroundColor:'#FFFFFF',
        },
      });
  constructor(props) {
    super(props);
    this.state = {
        loading:true,
        
    }
  }

  componentDidMount(){
      
  }

  
    render() {
        console.log('home_render')
        console.log(this.state.dataSource)
        return (
            <View style={styles.container}>
            
          </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})


export default Order
