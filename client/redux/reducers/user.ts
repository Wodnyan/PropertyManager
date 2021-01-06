import { User } from "../../types";

type Action = { type: "ADD_USER"; payload: User };

type State = User | null;

export default function userReducer(state: State = null, action: Action) {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;
    default:
      return state;
  }
}
