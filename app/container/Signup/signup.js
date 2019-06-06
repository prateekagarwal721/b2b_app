/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
// import { StackNavigator, TabNavigator , NavigationActions} from 'react-navigation';

var {height, width} = Dimensions.get('window');
class SignupScreen extends Component {


  static navigationOptions={
		header:null
	};

  constructor(props) {
    super(props);

    this.state = {
      usermobile: '',
    }
  }

    onSignupPress(props) {
        this.props.navigation.navigate('Otp')
    }


    render() {

        return (
          <View style={styles.usermobile}>
         
            <View style={styles.mobilenumber}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Enter your mobile number</Text>
            <Text style={{marginTop:20,textAlign:'center'}}> We will send a 6-digit Verification code to this mobile number</Text>
            <View style={styles.center}>

              <TextInput
                  style={styles.textinput}
                  autoFocus={false}
                  placeholderTextColor={'#ccc'}
                  selectionColor={'#7070D8'}
                  placeholder={'Enter your mobile number'}
                  keyboardType='numeric'
                  maxLength={10}
                  onChangeText={(usermobile) => this.setState({usermobile : usermobile})}

                />
              </View>

              <View style ={styles.buttoncont}>
                  <TouchableHighlight
                    underlayColor='#fff'
                    style ={styles.button}
                    onPress={() =>this.onSignupPress()}>
                    <Text style={styles.buttontext}>
                        Get Started
                    </Text>
                  </TouchableHighlight>
              </View>

              <View>
              </View>
              </View>
          </View>

        );

}
}

const styles = StyleSheet.create({

  mobilenumber:{
    flex: 1,
    marginTop:width/4,
    alignItems:'center'
    // justifyContent: 'center'
  },

  center:{
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0,
  },

  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#068481',
    width: 200,
    padding: 15,
    marginTop:20
  },
  buttontext:{
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textShadowRadius: 10
  },
  buttoncont:{
    justifyContent: 'center',
    flex: 0,
    padding: 20,
    flexDirection: 'row'
  },
  textinput: {
    marginTop:30,
    height: 40,
    width: width/1.2,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth:1,
    borderColor:'grey',
    color: '#000',
    fontFamily: 'TitilliumWeb-SemiBold'},

  usermobile: {
      justifyContent: 'center',
      flex:1,
      flexDirection: 'column',
      padding: 30,

  },
    inRow: {
     flexDirection: 'row',
     width:200
    }
})


export default SignupScreen
