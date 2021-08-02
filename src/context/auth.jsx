import { createContext, useContext, useReducer } from "react";

const StateContext = createContext({
  authentication: false,
  user: null,
  role: "",
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authentication: true,
        user: payload.user,
        role: payload.role,
      };

    case "LOGOUT":
      return {
        ...state,
        authentication: false,
        user: null,
        role: "",
      };

    default:
      throw new Error(`UNKNOWN ACTION TYPE! : ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    authentication: false,
    user: null,
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
