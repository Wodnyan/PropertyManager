import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./views/Home";
import { Login, SignUp } from "./views/AuthPages";
import Choose, { TenantChoice, LandlordChoice } from "./views/Choose";
import { Screens } from "./constants";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name={Screens.Home} component={Home} />
          <Stack.Screen name={Screens.Login} component={Login} />
          <Stack.Screen name={Screens.SignUp} component={SignUp} />
          <Stack.Screen name={Screens.Choose} component={Choose} />
          <Stack.Screen name={Screens.TenantChoice} component={TenantChoice} />
          <Stack.Screen
            name={Screens.LandlordChoice}
            component={LandlordChoice}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
