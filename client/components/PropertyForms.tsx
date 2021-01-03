import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { joinProperty, createProperty } from "../lib/api/properties";

export const CreateNewProperty = () => {
  return (
    <View>
      <Text h1>New Property</Text>
    </View>
  );
};

export const JoinProperty = () => {
  return (
    <View>
      <Text h1>Join Property</Text>
    </View>
  );
};
