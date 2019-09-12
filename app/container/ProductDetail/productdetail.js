/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput,Modal,ScrollView, Platform, TouchableHighlight,Keyboard, View, BackHandler, Text,StyleSheet,ActivityIndicator,Dimensions,ProgressBarAndroid,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';
import NumericInput from 'react-native-numeric-input'

var {height, width} = Dimensions.get('window');
class ProductDetail extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'Product ',
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
        open_modal:false,
        value:0,
        open_another_modal:false,
        result:{},
    }
  }

  componentDidMount(){
      this.getProduct()
  }

  getProduct(){
    product_id = this.props.navigation.state.params.product_id
    fetch(`http://localhost:8000/api/v1/category/get_product_details/?product_id=${product_id}`)
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson.result
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

    addMorePress(){
        this.setState({open_another_modal:false})
    }

    goCartPress(){
        this.setState({open_another_modal:false})
        this.props.navigation.navigate('ViewCart')
    }

    handleAddtoCartPress(){
        this.setState({open_modal:false,open_another_modal:true})
        fetch("http://localhost:8000/api/v1/cart/add_to_cart/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
   
          },
        body: JSON.stringify({
            customer_id: '1',
            product_id: this.state.dataSource.id,
            extra_details:{'quantity':this.state.value}
         }) 
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({result:responseJson.result})
        })
        .catch((error) => {
            console.error(error);
        });

    }


    renderConfirModal(){
        return(
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.open_another_modal}
                    onRequestClose={() => {this.setState({open_another_modal:false})}}>
                    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'flex-end'}}>
                      <View style={{width:width,height:width/2.5,backgroundColor:'#FFFFFF',borderRadius:3,padding:20}}>
                        <Text style={{textAlign:'center',color:'black'}}>Successfully added to cart</Text>
                        <TouchableOpacity onPress={()=>{this.addMorePress()}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20}}>
                                <Text style={{fontSize:14,color:'crimson'}}>&#8377;{this.state.dataSource.price}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:15,height:20,borderWidth:1,borderColor:'blue',backgroundColor:'blue'}}>
                                    <Text style={{color:'white',textAlign:'center'}}>+</Text>
                                    </View>
                                    <Text style={{color:'blue'}}> Add more</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{borderWidth:0.5,borderBottomColor:'#ccc',marginTop:10}}/>
                        <TouchableOpacity onPress={()=>{this.goCartPress()}}>
                            <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',paddingTop:10,color:'blue'}}> Go to cart</Text>
                        </TouchableOpacity>
                        </View>                        
                    </View>
                </Modal>
            </View>
            )
    }

    renderAddModal(){
        return(
        <View>
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.open_modal}
                onRequestClose={() => {this.setState({open_modal:false})}}>
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center'}}>
                  <View style={{width:width/1.1,height:width/2,backgroundColor:'#FFFFFF',borderRadius:3,padding:20}}>
                  
                  <Text style={{fontSize:14,color:'black'}}>&#8377;{this.state.dataSource.price} per pc</Text>
                  <Text style={{fontSize:12}}>* GST Not Applicable</Text>
                    <View style={{justifyContent:'space-between',paddingTop:20,flexDirection:'row'}}> 
                        <NumericInput 
                                value={this.state.value} 
                                onChange={value => this.setState({value})} 
                                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                totalWidth={width/3} 
                                totalHeight={30} 
                                iconSize={20}
                                step={1}
                                valueType='real' 
                                textColor='#B0228C' 
                                iconStyle={{ color: 'white' }} 
                                rightButtonBackgroundColor='#EA3788' 
                                leftButtonBackgroundColor='#E56B70'/>
                        {this.state.value === 0 ?
                        <View>
                            <Text>Min. qty.</Text>
                            <Text style={{textAlign:'right'}}>1</Text>
                        </View>
                        :
                        <View>
                            <Text style={{fontSize:14,textAlign:'right'}}>&#8377;{this.state.dataSource.price}</Text>
                            <Text style={{fontSize:10}}>* GST Not Applicable</Text>
                        </View>
                        }
                    </View>
                    <View style={{backgroundColor:'#FFFFFF',alignItems:'center',paddingTop:20}}>
                    <TouchableHighlight underlayColor='#fff' style ={{justifyContent: 'center',flexDirection: 'row',backgroundColor: '#068481',width: width/4,height:30,padding: 5,}}
                            onPress={() => {this.handleAddtoCartPress()}}>
                            <Text style={{color:'white',fontSize:12}}>Add to cart</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
        )
      }
  
    render() {
        console.log('home_render')
        console.log(this.state.dataSource)
        console.log(this.state.result)
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
                    {this.renderAddModal()}
                    {this.renderConfirModal()}
                <Image
                    style={{width:width/2,height:width/2}}
                    resizeMode={'center'}
                    source={require('@assets/images/logo.png')}
                    // source={{uri:'http://localhost:8000'+this.state.dataSource.picture}}
                    />
                    <View style={{backgroundColor:'white',padding:10,borderWidth:2,borderColor:'#ccc'}}>
                        <Text style={{fontSize:18}}>{this.state.dataSource.name}</Text>
                    </View>
                    <View style={{marginTop:5,padding:10,borderWidth:2,backgroundColor:'white',borderColor:'#ccc'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:16,color:'crimson'}}>&#8377;{this.state.dataSource.price} <Text style={{fontSize:14}}>per pc</Text></Text>
                            <Text style={{}}>Min. qty.</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:12,color:'black',}}>(&#8377;{this.state.dataSource.price} + 18% GST) <Text style={{fontSize:14}}>per pc</Text></Text>
                            <Text style={{}}></Text>
                        </View>
                    </View>
                    <View style={{marginTop:5,borderWidth:2,backgroundColor:'white',borderColor:'#ccc'}}>
                        <Text style={{fontSize:16,color:'black',padding:10}}>Specification</Text>
                        <Text style={{paddingLeft:10,width:width/1.1}}>{this.state.dataSource.specification}</Text>
                    </View>
                    <View style={{marginTop:5,borderWidth:2,backgroundColor:'white',borderColor:'#ccc'}}>
                        <Text style={{fontSize:16,color:'black',padding:10}}>Product Details</Text>
                        <Text style={{paddingLeft:10,width:width/1.1}}>{this.state.dataSource.specification}</Text>
                    </View>
                </View>
                </ScrollView>
            }
                <View style ={styles.buttoncont}>
                    <TouchableHighlight underlayColor='#fff' style ={styles.button}
                        onPress={() => {this.setState({open_modal:true})}}>
                        <Text style={styles.buttontext}>Buy Now</Text>
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


export default ProductDetail
