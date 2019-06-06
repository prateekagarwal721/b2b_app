/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, TouchableHighlight, View,BackHandler, Linking, Alert, Text,StyleSheet,Platform,Dimensions,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import Video from 'react-native-video'

type Props = {};
class SplashScreen extends Component{
    static navigationOptions={
		header:null
    };
    
    constructor(){
        super();

        this.state = {

        }
        console.log('splash')
    }

    componentDidMount(){
        console.log('splash_cdm')
        setTimeout(
            ()=> {
              this.props.navigation.navigate("Signup");
                },1000
        );
    }

    render(){
        console.log('splash_render')
        return(
            <View style={styles.usermobile}>
                <View style={styles.logocont}>
                {/* <Video source={require('@assets/images/logo_video.mp4')}
                     style={{position: 'absolute',
                             top: 0,
                             left: 0,
                             right: 0,
                             bottom: 0,
                            //  opacity: 0.3,
                            }}
                             muted={false}
                             repeat={false}
                             fullscreen={true}
                            resizeMode="contain"/> */}
                <Image
                    style={styles.logo}
                    resizeMode={'contain'}
                    source={require('@assets/images/logo.png')}
                    />
                </View>
                <Text style={{alignSelf:'center',fontFamily:'Arial',fontWeight:'bold',color:'#11137C',fontSize:15}}>Version.</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    usermobile: {
        justifyContent: 'flex-end',
        flex:1,
        padding: 30,
    },
    logocont:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    //   height: height/2.5
    },
    logo:{
      flex:1,
      justifyContent: 'center',
    },
    usermobile: {
      justifyContent: 'flex-end',
      flex:1,
      padding: 30,

  },
})

export default SplashScreen;