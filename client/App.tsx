import React, { useEffect } from "react";
import { getUserData } from "./lib/api/auth";
import Views from "./views/";
import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { ADD_USER } from "./redux/actions/user";

function App() {
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const user = await getUserData(token!);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <Views />;
}

export default App;
