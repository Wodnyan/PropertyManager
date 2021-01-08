import React, { useState, useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { joinProperty, createProperty } from "../lib/api/properties";
import { Property } from "../types";
import { useSelector, shallowEqual } from "react-redux";
import { createOwner } from "../lib/api/owners";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../constants";

export const CreateNewProperty = () => {
  const user = useSelector((state: any) => state.user, shallowEqual);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [propertyInfo, setPropertyInfo] = useState<Property>({
    name: "",
    ownerId: null,
    address: undefined,
    latitude: undefined,
    longitude: undefined,
  });

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const { owner } = await createOwner(user.id, token!);
      console.log("Owner: ", owner.id);
      const property = await createProperty(
        {
          ...propertyInfo,
          ownerId: owner.id,
        },
        token!
      );
      navigation.navigate(Screens.Properties);
      console.log(property);
    } catch (error) {
      console.error(error);
    }
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
