import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import { Login, SignUp } from "./AuthPages";
import Choose, { TenantChoice, LandlordChoice } from "./Choose";
import { Screens } from "../constants";
import Properties from "./Properties";
import { AsyncStorage } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER } from "../redux/actions/user";
import { getUserData } from "../lib/api/auth";

const Stack = createStackNavigator();

function Views() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const user = await getUserData(token!);
        dispatch(ADD_USER(user));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.Home}>
        <Stack.Screen name={Screens.Home} component={Home} />
        <Stack.Screen name={Screens.Login} component={Login} />
        <Stack.Screen name={Screens.SignUp} component={SignUp} />
        <Stack.Screen name={Screens.Choose} component={Choose} />
        <Stack.Screen name={Screens.TenantChoice} component={TenantChoice} />
        <Stack.Screen
          name={Screens.LandlordChoice}
          component={LandlordChoice}
        />
        <Stack.Screen name={Screens.Properties} component={Properties} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Views;
