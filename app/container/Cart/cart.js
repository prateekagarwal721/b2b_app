/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput,Modal,ScrollView, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,ActivityIndicator,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';
import NumericInput from 'react-native-numeric-input'

var {height, width} = Dimensions.get('window');
class Cart extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'Cart ',
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
      this.getCartItem()
  }

  getCartItem(){
      console.log('api')
    customer_id = 1
    fetch(`http://localhost:8000/api/v1/cart/view/?customer_id=${customer_id}`)
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson.result
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

    removeItemPress(id){
        fetch("http://localhost:8000/api/v1/cart/remove_from_cart/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
   
          },
        body: JSON.stringify({
            customer_id: '1',
            item_id: id,
         }) 
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({result:responseJson.result,loading:true})
            this.getCartItem()
        })
        .catch((error) => {
            console.error(error);
        });

    }


  
    render() {
        console.log('cart')
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
                    {this.state.dataSource.items.length > 0 ?
                        <View>
                            {this.state.dataSource.items.map((item,index)=>{
                                return(
                                    <View style={{flexDirection:'column',backgroundColor:'white',borderWidth:1,borderColor:'grey',paddingLeft:20,paddingTop:10,paddingBottom:10,paddingRight:20,marginBottom:10}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image
                                                style={{width:width/8,height:width/8}}
                                                resizeMode={'center'}
                                                source={{uri:'http://localhost:8000'+item.object.picture}}
                                                />
                                                <View style={{paddingLeft:10,alignContent:'center',flexDirection:'column'}}>
                                                    <View style={{flexDirection:'row'}}>
                                                    <Text style={{fontSize:16,color:'black'}}>{item.object.name}</Text>
                                                    {/* <Text style={{paddingLeft:width/3}}>Remove</Text> */}
                                                    </View>
                                                    <Text>{item.quantity} items</Text>
                                                    
                                                </View>
                                        </View>
                                        <View style={{width:width,borderColor:'lightgrey',borderWidth:0.5}}/>
                                        <View style={{paddingTop:5,flexDirection:'column'}}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text>Total Qty</Text>
                                                <Text style={{}}>{item.quantity}</Text>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text>Total Amount</Text>
                                                <Text style={{}}>&#8377;{item.item_total} </Text>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                                <Text>(&#8377;{item.invoice_items[0].amount} + &#8377;{item.invoice_items[1].amount}GST)</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'flex-end',paddingTop:5,paddingBottom:5}}>
                                            <TouchableHighlight onPress={()=>{this.removeItemPress(item.id)}}>
                                                <View style={{width:100,borderWidth:0.5,borderRadius:5,borderColor:'grey'}}>
                                                    <Text style={{padding:5,textAlign:'center',color:'black'}}>Remove</Text>
                                                </View>
                                            </TouchableHighlight>

                                            <TouchableHighlight style={{paddingLeft:40}}>
                                                <View style={{width:100,borderWidth:0.5,borderRadius:5,borderColor:'grey',backgroundColor:'#068481'}}>
                                                    <Text style={{padding:5,textAlign:'center',color:'white'}}>Review</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    :
                    <View style={{flex:1,height:height,justifyContent:'center',alignItems:'center',marginTop:10,paddingHorizontal:10,paddingVertical:5,backgroundColor:'transparent',borderRadius:100,}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontFamily:'Din Condensed',fontSize:width/8,color:'#FFFFFF'}}>Empty Cart</Text>
                        </View>
                    </View>
                }
                {this.state.dataSource.summary.length > 0 ?
                    <View style={{width:width,marginVertical:5,backgroundColor:'#FFFFFF',elevation:3,paddingHorizontal:10,paddingLeft:20,paddingRight:20}}>
                        <Text style={{marginTop:10,marginBottom:10,fontSize:18,color:'#000000',fontFamily:'Din Condensed'}}>Amount Details</Text>
                        <View>
                            {this.state.dataSource.summary.map((sum,index)=>{
                                return(
                                    <View key={sum.label} style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:'Din Condensed',fontSize:16,marginBottom:10,color:'#11137C'}}>{sum.label}</Text>
                                    <Text style={{fontFamily:'Arial',fontWeight:'bold',color:'#11137C',textShadowColor:'#FDD60B',textShadowOffset:{width:1,height:1}}}>{'\u20B9'} {sum.value}</Text>
                                </View>
                                );
                                })
                            }
                        </View>
                    </View>
                    :
                    <View />
                }
                </ScrollView>
            }
                <View style ={styles.buttoncont}>
                    <TouchableHighlight underlayColor='#fff' style ={styles.button}
                        onPress={() => {this.setState({open_modal:true})}}>
                        <Text style={styles.buttontext}>Check Out</Text>
                    </TouchableHighlight>
                    </View>
          </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(211,211,211,0.4)'
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#068481',
        width: width,
        height:40,
        padding: 5,
    },
    buttontext:{
        color: 'white',
        fontFamily:'Cochin',
        fontSize: 18,
        fontWeight: '400',
    },
    buttoncont:{
        justifyContent: 'center',
        flex: 0,
        padding: 5,
        flexDirection: 'row'
    },
})


export default Cart
