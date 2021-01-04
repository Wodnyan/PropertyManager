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

  const handlePress = () => {
    console.log(propertyInfo);
  };

  const handleTextChange = (text: string, name: string) => {
    setPropertyInfo((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  return (
    <View>
      <Input
        onChangeText={(text) => handleTextChange(text, "name")}
        value={propertyInfo.name}
        label="Property Name"
        placeholder="Property Name"
      />
      <Input
        onChangeText={(text) => handleTextChange(text, "address")}
        value={propertyInfo.address || ""}
        label="Address"
        placeholder="Adress"
      />
      <Input
        onChangeText={(text) => handleTextChange(text, "latitude")}
        value={propertyInfo.latitude?.toString() || ""}
        keyboardType="numeric"
        label="Latitude"
        placeholder="Latitude"
      />
      <Input
        onChangeText={(text) => handleTextChange(text, "longitude")}
        value={propertyInfo.longitude?.toString() || ""}
        keyboardType="numeric"
        label="Longitude"
        placeholder="Longitude"
      />
      <Button onPress={handlePress} title="Create" />
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
