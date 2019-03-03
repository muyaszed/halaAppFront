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

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
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
  Add: AddStack,
  Profile: ProfileStack,
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
