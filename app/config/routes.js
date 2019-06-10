import React from 'react';
import { Text } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import RestaurantScreen from '../screens/Restaurantscreen';
import AddScreen from '../screens/Addscreen';
import ProfileScreen from '../screens/Profilescreen';
import SignInScreen from '../screens/Signinscreen';
import AuthLoadingScreen from '../screens/Authloadingscreen';
import ReviewScreen from '../screens/ReviewScreen';
import MapScreen from '../screens/MapScreen';
import LandingScreen from '../screens/Landingscreen';
import SignUpScreen from '../screens/Signupscreen';
import CategoryScreen from '../screens/Categoryscreen';
import CuisineScreen from '../screens/Cuisinescreen';
import StartTimeScreen from '../screens/Starttimescreen';
import EndTimeScreen from '../screens/Endtimescreen';

const RestaurantStack = createStackNavigator({
  List: HomeScreen,
});

const AddStack = createStackNavigator({
  Add: AddScreen,
  Category: CategoryScreen,
  Cuisine: CuisineScreen,
  StartTime: StartTimeScreen,
  EndTime: EndTimeScreen,
});

AddStack.navigationOptions = {
  // title: '',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="plus" size={30} color={tintColor} style={{ paddingTop: 20 }} />
  ),
  tabBarLabel: () => <Text style={{ display: 'none' }}> Add </Text>,
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

const DetailTab = createMaterialTopTabNavigator(
  {
    Detail: RestaurantScreen,
    Review: ReviewScreen,
    Map: MapScreen,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#21c393',
      },
      indicatorStyle: {
        backgroundColor: '#009165',
      },
    },
  },
);

// DetailTab.navigationOptions = ({ navigation }) => {
//   const item = navigation.getParam('PressedItem');
//   const headerTitle = item.name;

//   return {
//     headerTitle,
//     headerStyle: {
//       backgroundColor: '#009165',
//     },
//     headerBackTitleStyle: {
//       color: 'black',
//     },
//     headerTintColor: 'black',
//   };
// };

const TabNavigator = createBottomTabNavigator(
  {
    Home: RestaurantStack,
    Add: AddStack,
    Profile: ProfileStack,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#21c393',
      },
      activeBackgroundColor: '#21c393',

      activeTintColor: 'black',
      inactiveTintColor: 'white',
    },
  },
);

TabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const HomeStack = createStackNavigator({
  Tab: TabNavigator,
  Item: DetailTab,
});

const AuthStack = createStackNavigator({
  Landing: LandingScreen,
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
});

const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNav);
