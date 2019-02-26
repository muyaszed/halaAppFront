import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import RestaurantScreen from '../screens/Restaurantscreen';
import AddScreen from '../screens/Addscreen';
import ProfileScreen from '../screens/Profilescreen';
import SignInScreen from '../screens/Signinscreen';
import AuthLoadingScreen from '../screens/Authloadingscreen';
import ReviewScreen from '../screens/ReviewScreen';
import MapScreen from '../screens/MapScreen';

const RestaurantStack = createStackNavigator({
  List: HomeScreen,
});

const DetailTab = createMaterialTopTabNavigator(
  {
    Detail: RestaurantScreen,
    Review: ReviewScreen,
    Map: MapScreen,
  },
  {},
);

DetailTab.navigationOptions = ({ navigation }) => {
  const item = navigation.getParam('PressedItem');
  const headerTitle = item.name;

  return {
    headerTitle,
  };
};

const TabNavigator = createMaterialBottomTabNavigator({
  Home: RestaurantStack,
  Add: AddScreen,
  Profile: ProfileScreen,
});

TabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const HomeStack = createStackNavigator({
  Tab: TabNavigator,
  Item: DetailTab,
});

HomeStack.navigationOptions = {
  title: 'Home Stack',
};

const AuthStack = createStackNavigator({
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
