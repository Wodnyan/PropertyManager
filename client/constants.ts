export const API_ENDPOINT = `http://${process.env.LOCAL_IP_ADDRESS}:5050/api/v1`;
export enum Screens {
  Home = "HOME",
  Login = "LOGIN",
  SignUp = "SIGNUP",
  Choose = "CHOOSE",
  LandlordChoice = "LANDLORDCHOICE",
  TenantChoice = "TENANTCHOICE",
}
