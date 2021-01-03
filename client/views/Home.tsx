import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Screens } from "../constants";

const styles = StyleSheet.create({
  heroText: {
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: 30,
  },
});

const Home: React.FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.heroText} h1>
        Welcome to your Property Manager
      </Text>
      <View style={styles.buttonGroup}>
        <Button
          title="Create an account!"
          onPress={() => navigation.navigate(Screens.SignUp)}
        />
        <Button title="Login" onPress={() => navigation.navigate(Screens.Login)} />
      </View>
    </View>
  );
};
export default Home;
