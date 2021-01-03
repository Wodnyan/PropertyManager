import React from "react";
import { View } from "react-native";
import { LoginForm, SignUpForm } from "../components/AuthForms";

export const Login = () => {
  return (
    <View>
      <LoginForm />
    </View>
  );
};

export const SignUp: React.FC = () => {
  return (
    <View>
      <SignUpForm />
    </View>
  );
};
