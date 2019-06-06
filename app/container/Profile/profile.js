/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';


var {height, width} = Dimensions.get('window');
class ProfileScreen extends Component {

    static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderCustomHeader(){
    return(
        <View style={{height:(Platform.OS == 'ios')? width/5.5 : width/7,paddingTop:(Platform.OS == 'ios')? width/15 : 0,backgroundColor:'#FFFFFF',elevation:3,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
            <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('DrawerOpen')}}
            style={{paddingLeft:10}}>
                <Icon style={{color:'#11137C'}} name="md-menu" />
            </TouchableOpacity>
            <Text style={{color:'#11137C',fontFamily:'Arial',width:width/3,textAlign:'center',fontSize:(Platform.OS == 'ios')? width/23 : width/20,fontWeight:'bold',marginLeft:(Platform.OS == 'ios')? width/15 :0 }}>Home</Text>
        </View>
    );
    }

    render() {
        return (
          <View style={styles.usermobile}>
          {/* {this.renderCustomHeader()} */}
            <Text>Welcome</Text>
          </View>

        );
    }
}

const styles = StyleSheet.create({

})


export default ProfileScreen
