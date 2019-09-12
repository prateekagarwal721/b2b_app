/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput,ScrollView, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,ActivityIndicator,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';


var {height, width} = Dimensions.get('window');
class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'Products ',
        headerTitleStyle :{textAlign: 'center',fontSize: 16,fontWeight:'400',alignSelf:'center',color:'#11137C'},
          headerStyle:{
            backgroundColor:'#FFFFFF',
        },
      });
  constructor(props) {
    super(props);
    this.state = {
        loading:true,
        dataSource:{},
    }
  }

  componentDidMount(){
      this.getCategory()
  }

  getCategory(){
    category_id = this.props.navigation.state.params.category_id
    fetch(`http://localhost:8000/api/v1/category/get_product_for_category/?id=${category_id}`)
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
  

    render() {
        console.log('category_render')
        console.log(this.state.dataSource)
        return (
            <View style={styles.container}>
            {this.state.loading ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='large' color='#11137C'/>
                    <Text style={{fontFamily:'Din Condensed',fontSize:18,marginTop:10}}>Loading...</Text>
                </View>
                :
                <ScrollView>
                <View>
                <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft: 5,marginTop:10}}>
                    {this.state.dataSource.result.map((res,index)=>{
                        return(
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Product',{product_id:res.id})}}>
                            <View style={ {borderColor: 'black', borderWidth: 2,width: width/2.145, 
                            height: height/3,
                            justifyContent: 'center',
                            marginLeft: 5,
                            marginBottom: 5,
                            }}>
                            <View style={{margin:10}}>
                            <Image
                                style={{width:width/2.5,height:height/5}}
                                resizeMode={'center'}
                                source={require('@assets/images/logo.png')}
                                // source={{uri:'http://localhost:8000'+res.picture}}
                                />
                            </View>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>{res.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                    </View>
                </View>
                </ScrollView>
            }
          </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})


export default CategoryScreen
