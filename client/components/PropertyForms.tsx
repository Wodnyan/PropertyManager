import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { joinProperty, createProperty } from "../lib/api/properties";
import { Property } from "../types";

export const CreateNewProperty = () => {
  const [propertyInfo, setPropertyInfo] = useState<Property>({
    name: "",
    ownerId: null,
    address: null,
    latitude: null,
    longitude: null,
  });

  return (
    <View>
      <Text h1>New Property</Text>
    </View>
  );
};

export const JoinProperty = () => {
  const [inviteCode, setInviteCode] = useState("");

  const handlePress = () => {
    console.log(inviteCode);
  };

  return (
    <View>
      <Text h1>Join Property</Text>
      <Input
        placeholder="Invite Code"
        value={inviteCode}
        onChangeText={(text) => setInviteCode(text)}
      />
      <Button onPress={handlePress} title="Join" />
    </View>
  );
};
