import React, { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../lib/api/auth";
import { Screens } from "../constants";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
}

interface SignUpUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const LoginForm = () => {
  return (
    <View>
      <Text>Login Page</Text>
    </View>
  );
};

export const SignUpForm: React.FC<any> = () => {
  const [userInfo, setUserInfo] = useState<SignUpUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      navigation.navigate(Screens.Choose);
      //const user = await signUp(userInfo);
      //console.log("User: ", user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text h1>Sign Up Page</Text>
      <Input
        placeholder="First Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, firstName: text }))
        }
        value={userInfo.firstName}
      />
      <Input
        placeholder="Last Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, lastName: text }))
        }
        value={userInfo.lastName}
      />
      <EmailInput
        value={userInfo.email}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, email: text }))
        }
      />
      <PasswordInput
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, password: text }))
        }
        value={userInfo.password}
      />
      <Button title="Sign up" onPress={handleSignUp} />
    </View>
  );
};

const EmailInput: React.FC<InputProps> = ({ onChangeText, value }) => {
  return (
    <Input
      placeholder="Email"
      onChangeText={onChangeText}
      value={value}
      leftIcon={<Icon name="envelope" size={24} color="black" />}
    />
  );
};

const PasswordInput: React.FC<InputProps> = ({ onChangeText, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      placeholder="Password"
      secureTextEntry={!showPassword}
      leftIcon={<Icon name="lock" size={24} color="black" />}
      onChangeText={onChangeText}
      value={value}
      rightIcon={
        <Icon
          name={showPassword ? "eye-slash" : "eye"}
          onPress={() => setShowPassword((prev) => !prev)}
          size={24}
          color="black"
        />
      }
    />
  );
};
