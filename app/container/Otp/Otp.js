/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
// import { StackNavigator, TabNavigator , NavigationActions} from 'react-navigation';

var {height, width} = Dimensions.get('window');
class OtpScreen extends Component {


  static navigationOptions={
		header:null
	};

  constructor(props) {
    super(props);

    this.state = {
        otp1:'',otp2:'',otp3:'',otp4:'',otp5:'',otp6:'',
    }
  }

    onSignupPress(props) {
        this.props.navigation.navigate('Root')
    }


    render() {

        return (
            <View style={styles.col_cont}>
            <View style={styles.col_inner}>
              <View style={styles.description}>
                <Text style={styles.text_head}>Verify your number</Text>
                <Text style={styles.text_content}>Enter the 6-digit Code sent to </Text>
              </View>
            <View>
            
            <View style={{marginTop:height/12,borderWidth:1,borderColor:'#ccc'}}/>
            <View style={styles.row_cont}>
            
            <TextInput
              ref="first"
              style={styles.textinput}
              maxLength={1}
              autoFocus={true}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.refs['second'].focus();
                 this.setState({otp1: val})
              }}
             />
             <TextInput
              ref="second"
              style={styles.textinput}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.refs['third'].focus();
                 this.setState({otp2: val})
              }}
             />
  
             <TextInput
              ref="third"
              style={styles.textinput}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.refs['fourth'].focus();
                 this.setState({otp3: val})
              }}
             />
  
             <TextInput
              ref="fourth"
              style={styles.textinput}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.refs['fifth'].focus();
                 this.setState({otp4: val})
             }}
             />
  
             <TextInput
              ref="fifth"
              style={styles.textinput}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.refs['sixth'].focus();
                 this.setState({otp5: val})
             }}
             />
  
             <TextInput
              ref="sixth"
              style={styles.textinput}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType='next'
              blurOnSubmit={false}
              placeholderTextColor="gray"
              onChangeText={(val) => {
                 this.setState({otp6: val})
             }}
             />
                </View>
                <View style={{marginTop:10,borderWidth:1,borderColor:'#ccc'}}/>
  
                <View style ={styles.buttoncont}>
                    <TouchableHighlight
                      underlayColor='#fff'
                      style ={styles.button}
                      onPress={() => {this.onSignupPress();}}>
                      <Text style={styles.buttontext}>
                          Submit
                      </Text>
                    </TouchableHighlight>
                </View>
            </View>
  
            </View>
        </View>

        );

}
}

const styles = StyleSheet.create({
    actions:{
      flexDirection: 'column',
      flex:0,
      justifyContent: 'space-around'
    },
    progress:{
      flex: 0,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    goback:{
      borderWidth:2,
      padding:6,
      width: width/5,
      justifyContent: 'center',
      flex:0,
      flexDirection: 'row',
      borderRadius:100,
      borderColor: '#11127c',
      marginTop:height/10,
      alignSelf: 'center'
    },

    col_cont: {
      flexDirection: 'column',
      flex:1,
      marginTop:width/4
    //   justifyContent: 'flex-start'
    },
    col_inner: {
      flexDirection: 'column',
      flex:1,
    //   justifyContent: 'center'
    },
    text_content:{
      flex: 0,
      fontSize:16,
      paddingTop:20,
      alignSelf: 'center'
    },
    text_head:{
      fontWeight: 'bold',
      fontSize:20,
      color:'black',
      flex: 0,
      alignSelf: 'center'

    },
    row_cont: {
    //   marginTop: height/12,
      flexDirection: 'row',
      flex:0,
      justifyContent: 'center'

    },
    button: {
        marginTop:height/10,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#068481',
    //   borderRadius: 30,
      width: width/1.6,
      padding: 15,
    },
    buttontext:{
      color: 'white',
      fontFamily:'Cochin',
      fontSize: 18,
      fontWeight: '400',
    //   textShadowColor: '#fff',
    //   textShadowOffset: {width: 4, height: 1},
    //   textShadowRadius: 10
    },
    buttontextverify:{
      color: '#11127c',
      fontSize: 15,
      fontWeight: 'bold',
      textShadowColor: '#fff',
      textShadowOffset: {width: 4, height: 1},
      textShadowRadius: 10,
      
    },
    buttontextverifywrong:{
      color: 'red',
      fontSize: 15,
      fontWeight: 'bold',
      textShadowColor: '#fff',
      textShadowOffset: {width: 4, height: 1},
      textShadowRadius: 10
    },
    buttoncont:{
      justifyContent: 'center',
      flex: 0,
      padding: 20,
      flexDirection: 'row'
    },
    textinput: {
    //   width:width/8,
      height:40,
      color: '#000',
      textAlign: 'center',
      justifyContent:'center',
      borderColor: 'gray',
      borderBottomWidth: 1,
      margin: 2,
      fontFamily: 'TitilliumWeb-SemiBold'},

    otpbox: {
        justifyContent: 'center',
        flex:1,
        padding: 30,
    },
      inRow: {
       flexDirection: 'row',
       width:200
      }
  })


export default OtpScreen
