import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../constants";
import { JoinProperty, CreateNewProperty } from "../components/PropertyForms";

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: "red",
    flexDirection: "column",
    margin: 5,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

const Choose = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        icon={<Icon name="home" size={25} />}
        title="Landlord"
        buttonStyle={styles.card}
        onPress={() => navigation.navigate(Screens.LandlordChoice)}
      />
      <Button
        icon={<Icon name="user" size={25} />}
        title="Tenant"
        buttonStyle={styles.card}
        onPress={() => navigation.navigate(Screens.TenantChoice)}
      />
    </View>
  );
};

export const TenantChoice = () => {
  return <JoinProperty />;
};

export const LandlordChoice = () => {
  return <CreateNewProperty />;
};

export default Choose;
