import React, { useState } from "react";
import { View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../lib/api/auth";
import { AsyncStorage } from "react-native";
import { Screens } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../redux/actions/user";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const user = await signUp(userInfo);
      await AsyncStorage.setItem("access_token", user.accessToken);
      dispatch(
        ADD_USER({
          id: user.user.id,
          firstName: user.user.first_name,
          lastName: user.user.last_name,
          email: user.user.email,
        })
      );
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate(Screens.Choose);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (error.errors?.length > 0) {
        console.error(error.errors);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <View>
      <Text h1>Sign Up Page</Text>
      <Input
        placeholder="First Name"
        leftIcon={<FontAwesome name="user" size={24} color="black" />}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, firstName: text }))
        }
        value={userInfo.firstName}
      />
      <Input
        placeholder="Last Name"
        leftIcon={<FontAwesome name="user" size={24} color="black" />}
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
      {isLoading ? (
        <Button loading />
      ) : (
        <Button title="Sign up" onPress={handleSignUp} />
      )}
    </View>
  );
};

const EmailInput: React.FC<InputProps> = ({ onChangeText, value }) => {
  return (
    <Input
      placeholder="Email"
      onChangeText={onChangeText}
      value={value}
      leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
    />
  );
};

const PasswordInput: React.FC<InputProps> = ({ onChangeText, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      placeholder="Password"
      secureTextEntry={!showPassword}
      leftIcon={<FontAwesome name="lock" size={24} color="black" />}
      onChangeText={onChangeText}
      value={value}
      rightIcon={
        <FontAwesome
          name={showPassword ? "eye-slash" : "eye"}
          onPress={() => setShowPassword((prev) => !prev)}
          size={24}
          color="black"
        />
      }
    />
  );
};
