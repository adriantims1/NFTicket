import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native";

//Screens
import HomeScreen from "../src/screens/HomeScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import ActivityScreen from "../src/screens/ActivityScreen";
import MarketScreen from "../src/screens/MarketScreen";

//Navigation Icons
import HomeIcon from "../src/components/icons/HomeIcon";
import ProfileIcon from "../src/components/icons/ProfileIcon";
import ActivityIcon from "../src/components/icons/ActivityIcon";
import MarketIcon from "../src/components/icons/MarketIcon";
const navigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Activity: ActivityScreen,
    Market: MarketScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: "#FFFFFF" },
      headerMode: "screen",
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return <HomeIcon color={tintColor} />;
        } else if (routeName === "Activity") {
          return <ActivityIcon color={tintColor} />;
        } else if (routeName === "Profile") {
          return <ProfileIcon color={tintColor} />;
        } else if (routeName === "Market") {
          return <MarketIcon color={tintColor} />;
        }
      },
      tabBarButtonComponent: (props) => {
        return (
          <TouchableOpacity
            {...props}
            style={[
              ...props.style,
              {
                width: 50,
                alignItems: "stretch",
                flex: 1,
              },
            ]}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "white",
      inactiveBackgroundColor: "white",
      inactiveTintColor: "#CBCDD4",
      showLabel: false,
      style: {
        backgroundColor: "transparent",
      },

      keyboardHidesTabBar: false,
    },
  }
);

const App = createAppContainer(navigator);

export default App;
