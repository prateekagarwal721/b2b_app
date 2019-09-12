import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity,View} from 'react-native';
import { Container,Content,Header,Item,Input, Footer, FooterTab,Icon } from 'native-base';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';
import SplashScreen from '../container/Splash/splash'
import SignupScreen from '../container/Signup/signup'
import HomeScreen from '../container/Home/home'
import ProfileScreen from '../container/Profile/profile'
import OtpScreen from '../container/Otp/Otp'
import ProductDetail from '../container/ProductDetail/productdetail'
import Cart from '../container/Cart/cart'
import CategoryScreen from '../container/Category/category'
import Order from '../container/Order/order'
import SearchBar from 'react-native-search-bar'



const TabNav = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        path: '/',
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Home',
            tabBarLabel: 'Home',
            headerLeft: <TouchableOpacity
                        onPress={() => {navigation.navigate('DrawerOpen')}}
                        style={{paddingLeft:10}}>
                        <Text>menu</Text>
                            {/* <Icon style={{color:'#11137C'}} name="md-menu" /> */}
                        </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}}>
                          <Text>Cart</Text>
                        </TouchableOpacity>
          }),
        },

    Profile: {
        screen: ProfileScreen,
    },

    },
    {
        headerMode:'screen',
        defaultNavigationOptions:({navigation})=>({
            headerLeft: <TouchableOpacity
                        onPress={() => {navigation.navigate('DrawerOpen')}}
                        style={{paddingLeft:10}}>
                        <Text>menu</Text>
                            {/* <Icon style={{color:'#11137C'}} name="md-menu" /> */}
                        </TouchableOpacity>,
            headerTitle:  "Home",
            headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}}>
                            <Text>Cart</Text>
                        </TouchableOpacity>
        }),
        initialRouteName:'Home',
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions:{
        labelStyle:{
            color:"#11137C",
            fontSize:10,
        },
        tabStyle:{
            padding:0,
            height:50,
        },
        showLabel:true,
        showIcon:true,
        },
  }
);

const OrderTabNav = createBottomTabNavigator({
    Order: {
        screen: Order,
        path: '/',
    },
    Profile: {
        screen: ProfileScreen,
    },

    },
    {
        headerMode:'screen',
        initialRouteName:'Order',
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions:{
        labelStyle:{
            color:"#11137C",
            fontSize:10,
        },
        tabStyle:{
            padding:0,
            height:50,
        },
        showLabel:true,
        showIcon:true,
        },
  }
);

const DrawerNav = createDrawerNavigator({
    DrawerItem1: {
        screen: TabNav,
        navigationOptions: {
          drawerLabel: 'Home',
        //   drawerIcon: ({ tintColor }) => (
        //     <Icon style={{color:'#11137C'}} name="ios-home-outline" />
        //   )
        },
    },
    DrawerItem2: {
        path: '/',
        screen: SignupScreen,
        navigationOptions: {
          drawerLabel: 'Login',
        },
    },
    },
    {
        drawerWidth:250,
        initialRouteName:'DrawerItem1',
        navigationOptions:({navigation})=>({
            headerLeft: <TouchableOpacity
                        onPress={() => {navigation.toggleDrawer()}}
                        style={{paddingLeft:10}}>
                        <Text>Menu</Text>
                            {/* <Icon style={{color:'#11137C'}} name="md-menu" /> */}
                        </TouchableOpacity>,
            headerTitle:  <SearchBar
                            placeholder='Search'
                                        />,
            headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('ViewCart')}} style={{paddingRight:20}}>
                            <Text>Cart</Text>
                        </TouchableOpacity>
        }),
        contentOptions:{
          labelStyle:{color:'#11137C',width:250},
        },
    },
);




const StacksOverTabs = createStackNavigator({
    Splash: {
        screen: SplashScreen,
    },
    Signup: {
        screen: SignupScreen,
    },
    Root:{
        screen: DrawerNav,
    },
    Otp:{
        screen: OtpScreen,
    },
    Product:{
        screen: ProductDetail,
    },
    ViewCart:{
        screen: Cart,
    },
    Category:{
        screen: CategoryScreen
    },
    // OrderTab:{
    //     screen: OrderTabNav,
    // }    
    },
    {
        headerMode: 'screen',
    }
);


TabNav.navigationOptions={
  header: null
}



const App = createAppContainer(StacksOverTabs);

export default App;
