type Action = { type: "ADD_USER"; payload: User };
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type State = User | null;

export default function userReducer(state: State = null, action: Action) {
  switch (action.type) {
    case "ADD_USER":
      return state;
    default:
      return state;
  }
}
