/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput,ScrollView, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,ActivityIndicator,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';


var {height, width} = Dimensions.get('window');
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'Home ',
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
    fetch("http://localhost:8000/api/v1/category/get_subcategory/")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
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
        console.log('home_render')
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
                    <View style={{flexDirection:'column'}}>
                    {this.state.dataSource.result.map((res,index)=>{
                        return(
                            <View style={{margin:10}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontSize:20,fontWeight:'bold'}}>{res.name}</Text>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Category',{category_id:res.id})}}>
                                        <Text style={{color:'blue',textDecorationLine:'underline'}}>View all</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:5,paddingRight:5}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {res.products.map((product,index)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Product',{product_id:product.id})}}>
                                            <View style={{flexDirection:'row',margin:5,height:width/2.5,width:width/2.5,borderWidth:1,borderColor:'grey'}}>
                                                <View style={{flexDirection:'column',marginLeft:10}}>
                                                    <Image
                                                        style={{width:width/3,height:width/3}}
                                                        resizeMode={'center'}
                                                        source={require('@assets/images/logo.png')}
                                                        // source={{uri:'http://localhost:8000'+product.picture}}
                                                        />
                                                    <Text style={{fontSize:16,textAlign:'center'}}>{product.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                                </ScrollView>
                                </View>
                            </View>
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


export default HomeScreen
